package com.bernz.service;

import java.util.List;
import java.util.Set;

import com.bernz.domain.OrderStatus;
import com.bernz.model.Address;
import com.bernz.model.Cart;
import com.bernz.model.Order;
import com.bernz.model.OrderItem;
import com.bernz.model.User;

public interface OrderService {
    Set<Order> createOrder(User user, Address shippingAddress, Cart cart);
    Order findOrderById(long id) throws Exception;
    List<Order> usersOrderHistory(Long userId);
    List<Order> sellersOrder(Long sellerId);
    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;
    Order cancelOrder(Long orderId, User user) throws Exception;
    OrderItem findOrderItemById(Long id) throws Exception;
}