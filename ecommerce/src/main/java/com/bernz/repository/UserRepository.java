package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
