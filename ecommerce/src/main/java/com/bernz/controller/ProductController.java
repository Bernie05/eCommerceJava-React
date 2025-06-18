package com.bernz.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.exceptions.ProductException;
import com.bernz.model.Product;
import com.bernz.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) throws ProductException {
        Product product = productService.findProductById(productId);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    // search?query="shirt"
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProoduct(@RequestParam(required = false) String query) throws ProductException {
        List<Product> products = productService.searchProducts(query);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
        @RequestParam(name = "category", required = false) String category,
        @RequestParam(name = "brand", required = false) String brand,
        @RequestParam(name = "color", required = false) String color,
        @RequestParam(name = "size", required = false) String size,
        @RequestParam(name = "minPrice", required = false) Integer minPrice,
        @RequestParam(name = "maxPrice", required = false) Integer maxPrice,
        @RequestParam(name = "minDiscount", required = false) Integer minDiscount,
        @RequestParam(name = "sort", required = false) String sort,
        @RequestParam(name = "stock", required = false) String stock,
        @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber
  ) throws ProductException {
        return new ResponseEntity<>(
            productService.getAllProducts(category, brand, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber), HttpStatus.OK);
    }
}
