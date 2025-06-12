package com.bernz.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.bernz.exceptions.ProductException;
import com.bernz.model.Category;
import com.bernz.model.Product;
import com.bernz.model.Seller;
import com.bernz.repository.CategoryRepository;
import com.bernz.repository.ProductRepository;
import com.bernz.request.CreateProduct;
import com.bernz.service.ProductService;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
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
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {
        findProductById(productId);
        product.setId(productId);
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found with id: " + productId));
    }

    @Override
    public List<Product> searchProducts(String query) throws ProductException {
        return productRepository.searchProduct(query);
    }

    @Override
    public Page<Product> getAllProducts(String category, String brand, String colors, String size, Integer minPrice,
            Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber)
            throws ProductException {
                
            // Specification - composable query conditions for your entitie
            // Predicate - It represents a single condition in a query (e.g., "price > 100", "category = 'Shoes'")
            // Join - Used to join related entities in a Criteria query (like SQL JOIN)
            Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
            }

            if (colors != null && !colors.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }

            if (size != null && !size.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("size"), size));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("selligPrice"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }

            if (minDiscount != null) {
                predicates.add(criteriaBuilder.equal(root.get("discountPercentage"), minDiscount));
            }

            if (stock != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Filtering
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            pageable = switch (sort) {
                case "price_low" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
                case "price_high" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
            };
        }
        else {
            pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
        }

        return productRepository.findAll(spec, pageable);
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) throws ProductException {
        return productRepository.findBySellerId(sellerId);
    }
    
    
}
