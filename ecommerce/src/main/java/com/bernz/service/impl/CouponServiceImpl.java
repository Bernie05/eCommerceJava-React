package com.bernz.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.bernz.model.Cart;
import com.bernz.model.Coupon;
import com.bernz.model.User;
import com.bernz.repository.CartRepository;
import com.bernz.repository.CouponRepository;
import com.bernz.repository.UserRepository;
import com.bernz.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCouponCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());

        if (coupon == null) {
            throw new Exception("Coupon is not valid");
        }

        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon is already used");
        }

        if (orderValue < coupon.getMinimumOrdervalue()) {
            throw new Exception("Coupon order is less than minimum order value " + coupon.getMinimumOrdervalue());
        }

        // between on the current date Ex. 1 startdate - 2 current date - 3 enddate = 2 isBefore on the startdate and isAfter on the enddate
        if (coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate()) && LocalDate.now().isBefore(coupon.getValidiDateEndDate())) {
            // Adding the coupon to the user
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            // Update the discounted price and set the new total selling price
            double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);

            return cart;
        }
    
        throw new Exception("Coupon is not valid");
    }

    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
       Coupon coupon = couponRepository.findByCouponCode(code);

       if (coupon == null) {
            throw new Exception("Coupon is already used");
       }

       Cart cart = cartRepository.findByUserId(user.getId());

       // We need to re-compute
       double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage());
       cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountedPrice);
       cart.setCouponCode(null);

       return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(() -> new Exception("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')") // only authorized to used this function
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
