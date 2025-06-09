package com.bernz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.domain.AccountStatus;
import com.bernz.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long>{
    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);
}
