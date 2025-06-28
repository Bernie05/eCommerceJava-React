package com.bernz.service.impl;

import org.springframework.stereotype.Service;

import com.bernz.model.Product;
import com.bernz.model.User;
import com.bernz.model.Wishlist;
import com.bernz.repository.WishlistRepository;
import com.bernz.service.WishlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository wishlistRepository;

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);

        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishByUserId(User user) {
       Wishlist wishlist = wishlistRepository.findByUserId(user.getId());

       if (wishlist == null) {
        wishlist = createWishlist(user);
       }

       return wishlist;
    }

    @Override
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());

        if (wishlist.getProducts().contains(product)) {
            wishlist.getProducts().remove(product);
        }
        else {
            wishlist.getProducts().add(product);
        }

        return wishlist;
    }
}
