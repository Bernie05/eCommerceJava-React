package com.bernz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Product;
import com.bernz.model.User;
import com.bernz.model.Wishlist;
import com.bernz.service.ProductService;
import com.bernz.service.UserService;
import com.bernz.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;
    private final UserService userService;
    private final ProductService productService;
    
    @GetMapping
    public ResponseEntity<Wishlist> getWishlistByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByEmail(jwt);

        Wishlist wishlist = wishlistService.getWishByUserId(user);

        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);
        Wishlist wishlist = wishlistService.addProductToWishlist(user, product);

        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }
}
