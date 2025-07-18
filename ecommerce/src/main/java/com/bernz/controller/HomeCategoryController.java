package com.bernz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Home;
import com.bernz.model.HomeCategory;
import com.bernz.service.HomeCategoryService;
import com.bernz.service.HomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HomeCategoryController {
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    // 13:14:51
    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategory(@RequestBody List<HomeCategory> homeCategories) {
        List<HomeCategory> categories = homeCategoryService.createCategory(homeCategories);
        Home home = homeService.createHomePageData(categories);

        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() throws Exception {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PatchMapping("/adminn/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable("id") Long id, @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updateCategory = homeCategoryService.updatedHomeCategory(homeCategory, id);
        return new ResponseEntity<>(updateCategory, HttpStatus.OK);
    }
}
