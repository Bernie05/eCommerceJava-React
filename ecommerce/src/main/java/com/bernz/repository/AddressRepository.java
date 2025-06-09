package com.bernz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bernz.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    
}
