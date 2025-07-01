package com.bernz.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bernz.model.HomeCategory;
import com.bernz.repository.HomeCategoryRepository;
import com.bernz.service.HomeCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategory(List<HomeCategory> homeCategory) {
        if (homeCategoryRepository.findAll().isEmpty()) {
            // Create home Category
            return homeCategoryRepository.saveAll(homeCategory);
        }

        return getAllHomeCategories();
    }

    @Override
    public HomeCategory updatedHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
            .orElseThrow(() -> new Exception("Category not found"));
 
        if (homeCategory.getImage() != null) {
            existingCategory.setImage(homeCategory.getImage());
        }

        if (homeCategory.getCategoryId() != null) {
            existingCategory.setCategoryId(homeCategory.getCategoryId());
        }

        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
