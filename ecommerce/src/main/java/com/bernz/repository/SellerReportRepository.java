package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long>{
    SellerReport findBySellerId(Long sellerId);
}
