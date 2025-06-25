package com.bernz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Transaction;

public interface TransactionReporitory extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySellerId(Long sellerId);
}
