package com.bernz.service.impl;


import org.springframework.stereotype.Service;

import com.bernz.repository.UserRepository;
import com.bernz.response.SignupRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;

    @Override
    public String createUser(SignupRequest req) {
        
        return null;
    }
}
