package com.bernz.service;

import com.bernz.model.Product;
import com.bernz.model.User;
import com.bernz.model.Wishlist;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
 