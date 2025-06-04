package com.bernz.service.impl;

import com.bernz.response.SignupRequest;

public interface AuthService {
    String createUser(SignupRequest req);
}
