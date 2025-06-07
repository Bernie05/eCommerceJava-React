package com.bernz.service;

import com.bernz.request.LoginRequest;
import com.bernz.response.AuthResponse;
import com.bernz.response.SignupRequest;

public interface AuthService {
    void sendLoginOtp(String email) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse signingUser(LoginRequest req) throws Exception;
}
