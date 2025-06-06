package com.bernz.service.impl;


import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bernz.config.JwtProvider;
import com.bernz.domain.USER_ROLE;
import com.bernz.model.Cart;
import com.bernz.model.User;
import com.bernz.repository.CartRepository;
import com.bernz.repository.UserRepository;
import com.bernz.response.SignupRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Override
    public String createUser(SignupRequest req) {
        // Check in repository
        String email = req.getEmail();
        String fullName = req.getFullname();
    
        User user = userRepository.findByEmail(email);

        // User is not exist in repository
        if (user == null) {
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullName(fullName);
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("09");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
            createdUser = userRepository.save(user);

            // After creating the user we need to create a Cart
            // cuz for every user there is attach cart on his/her account

            Cart cart = new Cart();
            cart.setUser(createdUser);
            cartRepository.save(cart);
        }
  
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        // Auth
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Return the generated token
        return jwtProvider.generateToken(authentication);
    }
}
