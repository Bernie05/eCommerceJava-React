package com.bernz.service.impl;

import java.util.Set;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.bernz.domain.PaymentOrderStatus;
import com.bernz.domain.PaymentStatus;
import com.bernz.model.Order;
import com.bernz.model.PaymentOrder;
import com.bernz.model.User;
import com.bernz.repository.OrderRepository;
import com.bernz.repository.PaymentOrderRepository;
import com.bernz.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    private String apiKey = "apikey";
    private String apiSecret = "apiSecret";
    private String stripeSecretKey = "stripeSecretKey";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        // Add all orders
        Long totalAmount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();

        // Payment Order
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(totalAmount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);

        // Save
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("Payment order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(paymentId);

        if (paymentOrder == null) {
            throw new Exception("Payment order not found with provided paymennt link id");
        }

        return paymentOrder;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymenntLinkId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
            Payment payment = razorpay.payments.fetch(paymenntLinkId);
            String status = payment.get("status");

            if (status.equals("captured")) {
                // Get the orders
                Set<Order> orders = paymentOrder.getOrders();

                for (Order order : orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                }

                // Change the Status of payment
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }

            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }

        return false;
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
        try {
            amount *= 100;
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            // Request for payment
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "USD");

            // Request for customer
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            // Notify User using msg
            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            // Callback
            paymentLinkRequest.put("callback_url", "http://localhost:5454/payment-success/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Create paymentLink
            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);
            String paymentLinkUrl = paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");


            return paymentLink;
        }
        catch(Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public String createStripPaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        SessionCreateParams params = SessionCreateParams.builder()
        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
        .setCancelUrl("http://localhost:3000/payment-cancel")
        .addLineItem(
            SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setUnitAmount(amount * 100)
                        .setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName("Bernz Bazaar payment").build()
                ).build()
            ).build()
        ).build();

        Session session = Session.create(params);

        return session.getUrl();
    }
}
