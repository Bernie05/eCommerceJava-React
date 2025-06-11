package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryId(String categoryId);
}
