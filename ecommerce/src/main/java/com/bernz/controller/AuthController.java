package com.bernz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.domain.USER_ROLE;
import com.bernz.model.VerificationCode;
import com.bernz.repository.UserRepository;
import com.bernz.request.LoginRequest;
import com.bernz.response.ApiResponse;
import com.bernz.response.AuthResponse;
import com.bernz.response.SignupRequest;
import com.bernz.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {
        AuthResponse res = null;
        String jwt = authService.createUser(req);

        res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Register Success");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup/otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody VerificationCode req) throws Exception {
        ApiResponse res = null;
        String email = req.getEmail();

        authService.sendLoginOtp(email);
        res = new ApiResponse();
        res.setMessage("OTP sent successfully");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {
        AuthResponse authResponse = authService.signingUser(req);

        return ResponseEntity.ok(authResponse);
    }
}
