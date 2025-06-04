package com.bernz.response;

import lombok.Data;

@Data
public class SignupRequest {
    public String email;
    private String fullname;
    private String otp;
}
