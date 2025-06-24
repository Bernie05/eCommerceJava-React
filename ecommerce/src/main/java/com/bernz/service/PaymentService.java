package com.bernz.service;

import java.util.Set;

import com.bernz.model.Order;
import com.bernz.model.PaymentOrder;
import com.bernz.model.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String payment, String paymenntLinkId) throws RazorpayException;
    PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException;
    String createStripPaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
