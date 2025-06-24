package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.PaymentOrder;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
    PaymentOrder findByPaymentnLinkId(String paymentId);
}