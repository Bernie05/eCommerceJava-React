package com.bernz.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.domain.PaymentMethod;
import com.bernz.model.Address;
import com.bernz.model.Cart;
import com.bernz.model.Order;
import com.bernz.model.User;
import com.bernz.response.PaymentLinkResponse;
import com.bernz.service.CartService;
import com.bernz.service.OrderService;
import com.bernz.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;

    @PostMapping()
    public ResponseEntity<PaymentLinkResponse> createOrderHandler(
        @RequestBody Address shippingAddress,
        @RequestParam PaymentMethod paymentMethod,
        @RequestHeader("Authorizatio") String jwt
    ) throws Exception {
        // Get user using jwt
        User user = userService.findUserByJwtToken(jwt);
        
        // Get the cart
        Cart cart = cartService.findUserCart(user);

        // Create a order
        Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);
    }

}
