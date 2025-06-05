package com.bernz.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disable HTTP session, to based on our API Stateless
        http.sessionManagement(management -> management.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS
        ))
        .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/**").authenticated()                                 // Require authentication for all endpoint in /api/
                .requestMatchers("/api/products/*/reviews").permitAll()                     // Allows anyone to access this path
                .anyRequest().permitAll()                                                               // Allowed without authentication
            ).addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)    // Add custom JwtTokenValidator, validate JWT token for incoming request 
                .csrf(csrf -> csrf.disable())                                                           // Disable protection for (common for stateless APIs/)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));                     // Using Custom Override function we allowed the CORS or cross origin request,

        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(Collections.singletonList("*"));                                  // Allows requests from any origin (* means all domains).
                cfg.setAllowedMethods(Collections.singletonList("*"));                                  // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.).
                cfg.setAllowedHeaders(Collections.singletonList("*"));                                  // Allows all headers in requests.
                cfg.setAllowCredentials(true);                                           // Allows cookies and credentials to be included in cross-origin requests.
                cfg.setExposedHeaders(Collections.singletonList("Authorization"));                      // Makes the Authorization header available to the client.
                cfg.setMaxAge(3600l);                                                              // CORS preflight response is cached for 3600 seconds (1 hour).
                return cfg;
            }
        };
    }

    // Purpose: Provides a PasswordEncoder bean using BCrypt hashing.
    // Usage: Used by Spring Security to securely hash and verify user passwords.
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Purpose: Provides a RestTemplate bean for making HTTP requests to other services/APIs.
    // Usage: You can inject this bean into other components to perform RESTful operations (GET, POST, etc.).
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
