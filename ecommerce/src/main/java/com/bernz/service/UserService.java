package com.bernz.service;

import com.bernz.model.User;

public interface UserService {
    User findByJwtToken(String jwt) throws Exception;
    User findByEmail(String email) throws Exception;
}
