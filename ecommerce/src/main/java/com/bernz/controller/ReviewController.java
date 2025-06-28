package com.bernz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Product;
import com.bernz.model.Review;
import com.bernz.model.User;
import com.bernz.request.CreateReviewRequest;
import com.bernz.response.ApiResponse;
import com.bernz.service.ProductService;
import com.bernz.service.ReviewService;
import com.bernz.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/product/{productId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable("productId") Long productId) {
        List<Review> reviews = reviewService.getReviewProductId(productId);

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/product/{productId}/reviews")
    public ResponseEntity<Review> writeReview(@RequestBody CreateReviewRequest req, 
        @PathVariable("productId") Long productId, @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);

        Review review = reviewService.createReview(req, user, product);

        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PatchMapping("/product/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody CreateReviewRequest req,
        @PathVariable("reviewId") Long reviewId, @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Review review = reviewService.updateReview(reviewId, req.getReviewText(), req.getReviewRating(), user.getId());

        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    // here 12:22:30
    @DeleteMapping("/product/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable("reviewId") Long reviewId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        reviewService.deleteReview(reviewId, user.getId());
        ApiResponse apiRes = new ApiResponse();
        apiRes.setMessage("Review deleted successfully");
        
        return new ResponseEntity<>(apiRes, HttpStatus.OK);
    }
}
