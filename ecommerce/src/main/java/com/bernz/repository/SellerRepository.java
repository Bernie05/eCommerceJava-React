package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long>{
    Seller findByEmail(String email);
}
