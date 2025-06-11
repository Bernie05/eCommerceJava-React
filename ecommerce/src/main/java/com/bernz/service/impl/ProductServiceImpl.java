package com.bernz.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.bernz.exceptions.ProductException;
import com.bernz.model.Category;
import com.bernz.model.Product;
import com.bernz.model.Seller;
import com.bernz.repository.CategoryRepository;
import com.bernz.repository.ProductRepository;
import com.bernz.request.CreateProduct;
import com.bernz.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    // 7:51:43
    public int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0");
        }

        double discount = mrpPrice - sellingPrice;
        int discountPercentage = ((int) (discount / mrpPrice) * 100);
        return discountPercentage;
    }

    @Override
    public Product createProduct(CreateProduct req, Seller seller) throws ProductException {
        Category category1 = categoryRepository.findByCategoryId(req.getCategory());

        if (category1 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);

            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(req.getCategory());

        if (category2 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(req.getCategory());

        if (category3 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int mrpPrice = req.getMrpPrice();
        int sellingPrice = req.getSellingPrice();

        int discountPercentage = calculateDiscountPercentage(mrpPrice, sellingPrice);

        Product product = new Product();

        product.setTitle(req.toString());
        product.setDescription(req.getDescription());
        product.setMrpPrice(mrpPrice);
        product.setSellingPrice(sellingPrice);
        product.setDiscountPercent(discountPercentage);
        product.setColor(req.getColor());
        product.setImages(req.getImages());
        product.setCategory(category3);
        product.setSeller(seller);
        product.setCreatedAt(LocalDateTime.now());
        product.setSizes(req.getSizes());

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteProduct'");
    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateProduct'");
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findProductById'");
    }

    @Override
    public List<Product> searchProducts(String name) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'searchProducts'");
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand, String colors, String size, Integer minPrice,
            Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber)
            throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllProducts'");
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProductBySellerId'");
    }
    
    
}
