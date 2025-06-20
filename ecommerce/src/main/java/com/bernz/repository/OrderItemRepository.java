package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
}
