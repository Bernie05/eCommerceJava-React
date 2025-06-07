package com.bernz.service.impl;

import org.springframework.stereotype.Service;

import com.bernz.config.JwtProvider;
import com.bernz.model.User;
import com.bernz.repository.UserRepository;
import com.bernz.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    @Override
    public User findByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findByEmail(email);

        if (user == null) {
            throw new Exception("User not found with email - " + email);
        }

        return user;
    }

    @Override
    public User findByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new Exception("User not found with email - " + email);
        }

        return user;
    }
}
