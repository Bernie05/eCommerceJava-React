package com.bernz.service.impl;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bernz.config.JwtProvider;
import com.bernz.domain.USER_ROLE;
import com.bernz.model.Cart;
import com.bernz.model.User;
import com.bernz.model.VerificationCode;
import com.bernz.repository.CartRepository;
import com.bernz.repository.UserRepository;
import com.bernz.repository.VerificationCodeRepository;
import com.bernz.request.LoginRequest;
import com.bernz.response.AuthResponse;
import com.bernz.response.SignupRequest;
import com.bernz.service.AuthService;
import com.bernz.service.EmailService;
import com.bernz.utils.OtpUtil;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserServiceImpl;

    @Override
    public String createUser(SignupRequest req) throws Exception {
        // Get the needed information
        String email = req.getEmail();
        String fullName = req.getFullname();
        String otp = req.getOtp();

        // Verification
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);

        System.out.println("otp: " + verificationCode.toString());
        if (verificationCode == null || !verificationCode.getOtp().equals(otp) ) {
            throw new Exception("Wrong otp");
        }
    
        User user = userRepository.findByEmail(email);

        // User is not exist in repository
        // Need to validate if there is a otp equal
        if (user == null) {
            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullName(fullName);
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("09");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
            
            User newlyCreateUser = userRepository.save(createdUser);
            System.out.println(newlyCreateUser);

            // After creating the user we need to create a Cart
            // cuz for every user there is attach cart on his/her account
            Cart cart = new Cart();
            cart.setUser(newlyCreateUser);
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

    @Override
    public void sendLoginOtp(String email) throws Exception {
        String SIGNNIG_PREFIX = "signin_";

        if (email.startsWith(SIGNNIG_PREFIX)) {
            email = email.substring(SIGNNIG_PREFIX.length()); // Ex. signin_test -> test

            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new Exception("User not exist with provided email");
            }
        }

        VerificationCode vrCode = verificationCodeRepository.findByEmail(email);
        if (vrCode != null) {
            verificationCodeRepository.delete(vrCode);
        }

        // Generate otp & Save
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        // Sending the otp verification
        String subject = "Subject test login/sign up otp";
        String text = "Your login/signup otp is - " + otp;
        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    @Override
    public AuthResponse signingUser(LoginRequest req) throws Exception {
        //  Get username as email & otp
        String username = req.getEmail();
        String otp = req.getOtp();

        // Set the authentication within the context
        Authentication authentication = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Success");

        // Adding the ACL or Role
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        System.out.println("#Role: " + roleName);

        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    // Verifying the Otp
    private Authentication authenticate(String username, String otp) {
        UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);

        if(userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

        if(verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("Wrong Otp");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
