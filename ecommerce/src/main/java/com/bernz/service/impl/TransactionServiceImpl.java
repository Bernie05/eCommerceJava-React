package com.bernz.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bernz.model.Order;
import com.bernz.model.Seller;
import com.bernz.model.Transaction;
import com.bernz.repository.SellerRepository;
import com.bernz.repository.TransactionReporitory;
import com.bernz.service.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private TransactionReporitory transactionReporitory;
    private SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) {
        Seller seller = sellerRepository.findById(order.getId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);
        
        return transactionReporitory.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionBySellerId(Seller seller) {
        return transactionReporitory.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransaction() {
        return transactionReporitory.findAll();
    }
    
}
