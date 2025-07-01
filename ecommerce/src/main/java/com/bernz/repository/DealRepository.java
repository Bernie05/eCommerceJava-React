package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {
    
}
