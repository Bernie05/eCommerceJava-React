package com.bernz.service;

import java.util.List;

import com.bernz.model.HomeCategory;

public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory homeCategory) ;
    List<HomeCategory> createCategory(List<HomeCategory> homeCategory);
    HomeCategory updatedHomeCategory(HomeCategory homeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}
