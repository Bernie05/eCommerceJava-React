package com.bernz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.domain.AccountStatus;
import com.bernz.model.Seller;
import com.bernz.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final SellerService sellerService;
    
    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(@PathVariable("id") Long id, @PathVariable("status") AccountStatus status) throws Exception {
        Seller updateSeller = sellerService.updateSellerAccountStatus(id, status);
        return new ResponseEntity<>(updateSeller, HttpStatus.OK);
    }

}
