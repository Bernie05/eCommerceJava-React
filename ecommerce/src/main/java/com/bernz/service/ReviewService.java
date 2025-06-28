package com.bernz.service;

import java.util.List;

import com.bernz.model.Product;
import com.bernz.model.Review;
import com.bernz.model.User;
import com.bernz.request.CreateReviewRequest;

public interface ReviewService {
    Review createReview(CreateReviewRequest req, User user, Product product);
    List<Review> getReviewProductId(Long productId);
    Review updateReview(Long reviewId, String reviewText, double reviewRating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
}
