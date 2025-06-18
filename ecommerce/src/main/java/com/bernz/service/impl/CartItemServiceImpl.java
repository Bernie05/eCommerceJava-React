package com.bernz.service.impl;

import org.springframework.stereotype.Service;

import com.bernz.model.CartItem;
import com.bernz.model.User;
import com.bernz.repository.CartItemRepository;
import com.bernz.service.CartItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService{
    private final CartItemRepository cartItemRepository;

    // 9:27:57
    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
        CartItem item = findCartItemById(id);
        User cartItemUser = item.getCart().getUser();

        // Make sure to check if the cart item has same userId
        if (cartItemUser.getId().equals(userId)) {
            // Set all the details
            item.setQuantity(cartItem.getQuantity());
            item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
            item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());

            // save
            return cartItemRepository.save(item);
        }
        throw new Exception("You can't update this cartItem");
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws Exception {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = cartItem.getCart().getUser();

        if (user.getId().equals(userId)) {
            cartItemRepository.delete(cartItem);
        }
        else throw new Exception("You can't delete this cartItem");
    }

    @Override
    public CartItem findCartItemById(Long id) throws Exception {
        return cartItemRepository.findById(id).orElseThrow(() -> new Exception("Cart Item not found with Id" + id));
    }
}
