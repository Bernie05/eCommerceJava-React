package com.bernz.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// The extended OncePerRequestFilter ensuring the filter runs once per request 
public class JwtTokenValidator extends OncePerRequestFilter { 

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
            // Get the JWT Header on the Request Header
            String jwt = request.getHeader(jwtConstant.JWT_HEADER);

            // Check if the jwt is not null
            if (jwt != null) {
                // Remove the Bearer in header Ex. Bearer a2rqw....
                jwt = jwt.substring(7);
                try {
                    // Create a secret key for verifying the JWT Signature
                    SecretKey key = Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());

                    // Extract the claims payload data
                    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                    // Get the email & authorities
                    String email = String.valueOf(claims.get("email"));
                    String authorities = String.valueOf(claims.get("authorities"));

                    // Converted the authorities into list of GrantedAuthority
                    List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                    // Create an Authentication token with the user's email and authorities
                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

                    // Stores the authentication object in the security context, marking the user as authenticated for the current request.
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                catch (Exception e) {
                    throw new BadCredentialsException("Invalid JWT Token");
                }
            }

            filterChain.doFilter(request, response);

        }
    
}
