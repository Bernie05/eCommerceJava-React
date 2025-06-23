package com.bernz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.domain.OrderStatus;
import com.bernz.exceptions.SellerException;
import com.bernz.model.Order;
import com.bernz.model.Seller;
import com.bernz.service.OrderService;
import com.bernz.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {
    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersHandler(@RequestHeader("Authorization") String jwt) throws SellerException {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Order> sellerOrders = orderService.sellersOrder(seller.getId());

        return new ResponseEntity<>(sellerOrders, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<Order> updateOrderHandler(
        @RequestHeader("Authorization") String jwt, 
        @PathVariable("orderId") Long orderId, 
        @PathVariable("orderStatus") OrderStatus orderStatus
    ) throws Exception {
        Order updateOrder = orderService.updateOrderStatus(orderId, orderStatus);

        return new ResponseEntity<>(updateOrder, HttpStatus.OK);
    }
}
