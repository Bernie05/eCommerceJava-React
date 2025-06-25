package com.bernz.service;

import java.util.List;

import com.bernz.model.Order;
import com.bernz.model.Seller;
import com.bernz.model.Transaction;

public interface TransactionService {
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransaction();
}
