package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {
    
}
