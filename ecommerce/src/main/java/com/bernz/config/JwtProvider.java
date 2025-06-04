package com.bernz.config;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
    // Create a secret key for sining and verifying the JWTs
    SecretKey key = Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        // Extracts the user's authorities (roles/permissions).
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        // Converts authorities to a comma-separated string using populateAuthorities.
        String roles = populateAuthorities(authorities);

        // Creating a token
        return Jwts.builder().setIssuedAt(new Date())
                                   .setExpiration(new Date(new Date().getTime() + 84600000))     // Set current time as the issue date.
                                   .claim("email", auth.getName())                          // Set user email
                                   .claim("authorities", roles)                             // Set user role
                                   .signWith(key)                                                // Signs the token with your secret key
                                   .compact();                                                   // Build the JWT String
    }

    public String getEmailFromJwtToken(String jwt) {
        // Remove the Bearer
        if (jwt.startsWith("Bearer")) {
            jwt = jwt.substring(7);
        }
       
        // Extract the claims payload data
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        // Get the email & authorities
        String email = String.valueOf(claims.get("email"));
        return email;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths = new HashSet<>();

        for (GrantedAuthority auth : authorities) {
            auths.add(auth.getAuthority());
        }

        return String.join(",", auths);
    }
}
