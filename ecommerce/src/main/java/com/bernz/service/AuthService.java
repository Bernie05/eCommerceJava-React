package com.bernz.service;

import com.bernz.response.SignupRequest;

public interface AuthService {
    void sendLoginOtp(String email) throws Exception;
    String createUser(SignupRequest req) throws Exception;
}
