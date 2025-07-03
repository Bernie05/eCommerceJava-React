package com.bernz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Cart;
import com.bernz.model.Coupon;
import com.bernz.model.User;
import com.bernz.response.ApiResponse;
import com.bernz.service.CouponService;
import com.bernz.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupon")
public class AdminCouponController {
    private final CouponService couponService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Cart> applyCoupon(@RequestParam Boolean isApplyCoupon, @RequestParam String code, 
        @RequestParam double orderValue, @RequestHeader("Authorization") String jwt) throws Exception {
        
        User user = userService.findUserByJwtToken(jwt);
        Cart cart;

        if (isApplyCoupon) {
            cart = couponService.applyCoupon(code, orderValue, user);
        }
        else {
            cart = couponService.removeCoupon(code, user);
        }

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    /* Admin Operation */
    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return new ResponseEntity<>(createdCoupon, HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ApiResponse> deleteCoupon(@PathVariable("id") Long id) throws Exception{
        couponService.deleteCoupon(id);

        ApiResponse apiRes = new ApiResponse();
        apiRes.setMessage("Coupon deleted Successfully");

        return new ResponseEntity<>(apiRes, HttpStatus.OK);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
       List<Coupon> coupons = couponService.findAllCoupons();

       return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
}
