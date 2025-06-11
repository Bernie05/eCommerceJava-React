package com.bernz.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bernz.exceptions.ProductException;
import com.bernz.model.Product;
import com.bernz.model.Seller;
import com.bernz.request.CreateProduct;

public interface ProductService {
    public Product createProduct(CreateProduct req, Seller seller) throws ProductException ;
    public void deleteProduct(Long productId) throws ProductException ;
    public Product updateProduct(Long productId, Product product) throws ProductException ;
    public Product findProductById(Long productId) throws ProductException ;
    public List<Product> searchProducts(String name) throws ProductException ;
    public Page<Product> getAllProducts(
        String category, String brand, String colors,
        String size, Integer minPrice, Integer maxPrice,
        Integer minDiscount, String sort, String stock,
        Integer pageNumber
       ) throws ProductException ;
    public List<Product> getProductBySellerId(Long sellerId) throws ProductException ;
}
