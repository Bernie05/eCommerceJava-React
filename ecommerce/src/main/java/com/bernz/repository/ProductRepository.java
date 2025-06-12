package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bernz.model.Product;

// JpaSpecificationExecutor - It allows you to write dynamic, type-safe queries using the JPA Criteria API.
//                          - You can filter, sort, and paginate results based on complex, runtime conditions.
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    
}
