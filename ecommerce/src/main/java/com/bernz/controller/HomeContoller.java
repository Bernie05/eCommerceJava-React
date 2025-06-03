package com.bernz.controller;

import org.springframework.web.bind.annotation.RestController;

import com.bernz.response.ApiResponse;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HomeContoller {
    @GetMapping
    public ApiResponse HomeControllerHandler() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Hello word");
        return apiResponse;
    }
}
