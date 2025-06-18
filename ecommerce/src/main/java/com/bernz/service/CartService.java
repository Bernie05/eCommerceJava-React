package com.bernz.service;

import com.bernz.model.Cart;
import com.bernz.model.CartItem;
import com.bernz.model.Product;
import com.bernz.model.User;

public interface CartService {
    public CartItem addCartItem(User user, Product product, String size, int quantity);
    public Cart findUserCart(User user);
}
