package com.bernz.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.domain.PaymentMethod;
import com.bernz.model.Address;
import com.bernz.model.Cart;
import com.bernz.model.Order;
import com.bernz.model.OrderItem;
import com.bernz.model.PaymentOrder;
import com.bernz.model.Seller;
import com.bernz.model.SellerReport;
import com.bernz.model.User;
import com.bernz.repository.PaymentOrderRepository;
import com.bernz.response.PaymentLinkResponse;
import com.bernz.service.CartService;
import com.bernz.service.OrderService;
import com.bernz.service.PaymentService;
import com.bernz.service.SellerReportService;
import com.bernz.service.SellerService;
import com.bernz.service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor 
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final PaymentService paymentService;
    private final PaymentOrderRepository paymentOrderRepository;
    
    @PostMapping()
    public ResponseEntity<PaymentLinkResponse> createOrderHandler(
        @RequestBody Address shippingAddress,
        @RequestParam PaymentMethod paymentMethod,
        @RequestHeader("Authorization") String jwt
    ) throws Exception {
        // Get user using jwts
        User user = userService.findUserByJwtToken(jwt);
        
        // Get the cart
        Cart cart = cartService.findUserCart(user);

        // Create a order
        Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);
         
        // Create payment order
        PaymentOrder paymentOrder = paymentService.createOrder(user, orders);

        PaymentLinkResponse res = new PaymentLinkResponse();

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            PaymentLink paymentLink = paymentService.createRazorpayPaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());
            String paymentUrl = paymentLink.get("short_url");
            String paymentUrlId = paymentLink.get("id");
            
            res.setPayment_link_url(paymentUrl);
            paymentOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(paymentOrder);
        }
        else {
            String paymentUrl = paymentService.createStripPaymentLink(user,  paymentOrder.getAmount(), paymentOrder.getId());
            res.setPayment_link_url(paymentUrl);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorizatin") String jwt) throws Exception {
        // Get User
        User user = userService.findUserByJwtToken(jwt);

        // Get Order history
        List<Order> orders = orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") Long orderId, @RequestHeader("Authorization") String jwt) throws Exception {
        Order order = orderService.findOrderById(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable("orderItemId") Long orderItemId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.findOrderItemById(orderItemId);

        return new ResponseEntity<>(orderItem, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable("orderId") Long orderId, @RequestHeader("Authorization") String jwt) throws Exception {
        // User side
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);

        // Seller side
        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport sellerReport = sellerReportService.getSellerReport(seller);
        
        sellerReport.setCanceledOrders(sellerReport.getCanceledOrders() + 1);
        // get the total refund + the current order refund
        sellerReport.setTotalRefund(sellerReport.getTotalRefund() + order.getTotalSellingPrice());
        sellerReportService.updatedSellerReport(sellerReport);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
