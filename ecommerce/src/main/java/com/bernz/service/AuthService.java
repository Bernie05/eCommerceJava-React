package com.bernz.service;

import com.bernz.domain.USER_ROLE;
import com.bernz.request.LoginRequest;
import com.bernz.response.AuthResponse;
import com.bernz.response.SignupRequest;

public interface AuthService {
    void sendLoginOtp(String email, USER_ROLE role) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse signingUser(LoginRequest req) throws Exception;
}
