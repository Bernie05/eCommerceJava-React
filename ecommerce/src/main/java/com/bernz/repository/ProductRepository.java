package com.bernz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bernz.exceptions.ProductException;
import com.bernz.model.Product;

// JpaSpecificationExecutor - It allows you to write dynamic, type-safe queries using the JPA Criteria API.
//                          - You can filter, sort, and paginate results based on complex, runtime conditions.
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    
    // Spring Data automatically generates the implementation at runtime based on the method name
    List<Product> findBySellerId(Long id) throws ProductException;

    // Custom queries
    @Query("SELECT p FROM Product p WHERE " +
        "(:query IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
        "OR LOWER(p.category.name) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProduct(@Param("query") String query);
}
