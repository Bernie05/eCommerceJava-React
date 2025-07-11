package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long>{
    Coupon findByCode(String code);
}
