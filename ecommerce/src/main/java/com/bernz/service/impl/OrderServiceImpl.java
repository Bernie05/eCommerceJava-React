package com.bernz.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bernz.domain.OrderStatus;
import com.bernz.domain.PaymentStatus;
import com.bernz.model.Address;
import com.bernz.model.Cart;
import com.bernz.model.CartItem;
import com.bernz.model.Order;
import com.bernz.model.OrderItem;
import com.bernz.model.User;
import com.bernz.repository.AddressRepository;
import com.bernz.repository.OrderItemRepository;
import com.bernz.repository.OrderRepository;
import com.bernz.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {

        // if the user already have a address we need to update the user address
        if(!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }

        Address address = addressRepository.save(shippingAddress);

        // adding the multiple shop thats hold a multiple item
        // Ex shop1 -> you order 2 items
        //    shop2 -> you also order 2 items

        // filter by shop in your cart Ex. Map<sellerId, List<CartItem>>
        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream().collect(
            Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        // compute total prices and save to db
        Set<Order> orders = new HashSet<>();
        
        // Loop per seller
        for (Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            // Loop per item prices, quantiy etc.
            int totalOrderPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            // Parent Order
            // Set the needed value on the order
            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippinhAddress(address);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymenDetails().setStatus(PaymentStatus.PENDING);

            // Save the order
            Order savedOrder = orderRepository.save(createdOrder);
            orders.add(savedOrder);

            // Child OrderItems
            List<OrderItem> orderItems = new ArrayList();
            
            for(CartItem item : items) {
                OrderItem orderItem = new OrderItem();

                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                // save from parent -> child
                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
                orderItems.add(savedOrderItem);
            }
        }

        return orders;
    }

    @Override
    public Order findOrderById(long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(() -> new Exception("Order not founnd"));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);

        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if (!user.getId().equals(order.getUser().getId())) {
            throw new Exception("You don't have an access to this order");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);

        return orderRepository.save(order);
    }

    @Override
    public OrderItem findOrderItemById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(() -> new Exception("Cannot access Order item"));
    }
    
}
