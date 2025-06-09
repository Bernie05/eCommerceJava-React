package com.bernz.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bernz.config.JwtProvider;
import com.bernz.domain.AccountStatus;
import com.bernz.domain.USER_ROLE;
import com.bernz.model.Address;
import com.bernz.model.BankDetails;
import com.bernz.model.BusinessDetails;
import com.bernz.model.Seller;
import com.bernz.repository.AddressRepository;
import com.bernz.repository.SellerRepository;
import com.bernz.service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
       String email = jwtProvider.getEmailFromJwtToken(jwt);

       return getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws Exception {
        String email = seller.getEmail();
        Seller isExist = sellerRepository.findByEmail(email);

        // Check if the seller exists using by email
        if (isExist != null) {
            throw new Exception("Seller already exists, kindly used different email");
        }

        // Set all the data for seller
        // Add first the address
        Address savedAddress = addressRepository.save(seller.getPickupAddress());

        // Add seller details
        Seller newSeller = new Seller();
        newSeller.setEmail(email);
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        // Add Seller
        return sellerRepository.save(newSeller);

    }

    @Override
    public Seller getSellerById(Long id) throws Exception {
        return sellerRepository.findById(id)
            .orElseThrow(() -> new Exception("Seller not found id: " + id));
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);

        if (seller == null) {
           throw new Exception("Seller not found");
        }

        return seller;
    }

    @Override
    public List<Seller> getAllSeller(AccountStatus accountStatus) {
        return sellerRepository.findByAccountStatus(accountStatus);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        // Seller
        String sellerName = seller.getSellerName();
        String mobile = seller.getMobile();
        String email = seller.getEmail();
        String GSTIN = seller.getGSTIN();
    
        // Address
        Address address = seller.getPickupAddress();
        String pickUpAddress = address.getAddress();
        String pickUpMobile = address.getMobileNumber();
        String pickUpCity = address.getCity();
        String pickUpState = address.getState();
        String pickUpPinCode = address.getPinCode();

        // Business Details
        BusinessDetails businessDetails = seller.getBusinessDetails();
        String businessDetailsName = businessDetails.getBusinessName();
        
        // BankDetails
        BankDetails bankDetails = seller.getBankDetails();
        String sellerBankDetailsAccName = bankDetails.getAccountHolderName();
        String selletBankDetailsAccNo = bankDetails.getAccountNumber();
        String sellerBankDetailCode = bankDetails.getIfscCode();

      
    
        Seller existingSeller = getSellerById(id);

        if (sellerName != null) {
            existingSeller.setSellerName(sellerName);
        }

        if (mobile != null) {
            existingSeller.setMobile(sellerName);
        }

        if (email != null) {
            existingSeller.setEmail(email);
        }

        if (businessDetails != null && businessDetailsName != null) {
            existingSeller.getBusinessDetails().setBusinessName(businessDetailsName);
        }

        if (bankDetails != null && sellerBankDetailsAccName != null && selletBankDetailsAccNo != null && sellerBankDetailCode != null) {
            existingSeller.getBankDetails().setAccountHolderName(sellerBankDetailsAccName);
            existingSeller.getBankDetails().setAccountNumber(selletBankDetailsAccNo);
            existingSeller.getBankDetails().setIfscCode(sellerBankDetailCode);
        }

        if (address != null && pickUpAddress != null && pickUpCity != null && pickUpMobile!= null && pickUpPinCode != null && pickUpState != null) {
            existingSeller.getPickupAddress().setAddress(pickUpAddress);
            existingSeller.getPickupAddress().setCity(pickUpCity);
            existingSeller.getPickupAddress().setMobileNumber(mobile);
            existingSeller.getPickupAddress().setPinCode(pickUpPinCode);
            existingSeller.getPickupAddress().setPinCode(pickUpPinCode);
        }

        if (GSTIN != null) {
            existingSeller.setGSTIN(GSTIN);
        }

        // Save the seller
        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
    
}
