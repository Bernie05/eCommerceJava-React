package com.bernz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Deal;
import com.bernz.response.ApiResponse;
import com.bernz.service.DealService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deal")
public class DealController {
   private final DealService dealService;

   @PostMapping
   public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        Deal createdDeal = dealService.craeteDeal(deal);

        return new ResponseEntity<>(createdDeal, HttpStatus.OK);
   }

   @PatchMapping("/{id}")
   public ResponseEntity<Deal> updateDeal(@PathVariable("id") Long id, @RequestBody Deal deal) throws Exception {
        Deal updatedDeal = dealService.updateDeal(id, deal);

        return new ResponseEntity<>(updatedDeal, HttpStatus.OK);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<ApiResponse> deleteDeal(@PathVariable("id") Long id) throws Exception {
        dealService.deleteDeal(id);

        // Create ApiResponse
        ApiResponse apiRes = new ApiResponse();
        apiRes.setMessage("Deal deleted");

        return new ResponseEntity<>(apiRes, HttpStatus.OK);
   }
}
