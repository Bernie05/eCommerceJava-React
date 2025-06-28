package com.bernz.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bernz.model.Product;
import com.bernz.model.Review;
import com.bernz.model.User;
import com.bernz.repository.ReviewRepository;
import com.bernz.request.CreateReviewRequest;
import com.bernz.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review = new Review();

        // Set the needed value on the review
        review.setUser(user);
        review.setProduct(product);
        
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());

        // Adding on target product
        product.getReviews().add(review);

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double reviewRating, Long userId) throws Exception {
        Review review = getReviewById(reviewId);

       if (!review.getUser().getId().equals(userId)) {
            throw new Exception("You cannot update this review");
        }

        // Set thew new Review
        review.setReviewText(reviewText);
        review.setRating(reviewRating);

        // Update the review on db and return
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        
        if (!review.getUser().getId().equals(userId)) {
            throw new Exception("You cannot delete this review");
        }

        reviewRepository.delete(review);
    }

	@Override
	public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new Exception("Review not foudn"));
	}
}
