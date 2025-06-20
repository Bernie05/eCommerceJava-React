package com.bernz.service.impl;

import org.springframework.stereotype.Service;

import com.bernz.model.Cart;
import com.bernz.model.CartItem;
import com.bernz.model.Product;
import com.bernz.model.User;
import com.bernz.repository.CartItemRepository;
import com.bernz.repository.CartRepository;
import com.bernz.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if (cartItem == null) {
            // create a cart item
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setQuantity(quantity);
            newCartItem.setUserId(user.getId());
            newCartItem.setMrpPrice(quantity * product.getMrpPrice());
            newCartItem.setSize(size);
            newCartItem.setSellingPrice(quantity * product.getSellingPrice());

            // add to your cart
            cart.getCartItems().add(newCartItem);

            // set to have fk
            newCartItem.setCart(cart);
            
            return cartItemRepository.save(newCartItem);
        }

        return cartItem;
    }

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));

        return cart;
    }

        
    public int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice < 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0");
        }

        double discount = mrpPrice - sellingPrice;
        int discountPercentage = ((int) (discount / mrpPrice) * 100);
        return discountPercentage;
    }

}
