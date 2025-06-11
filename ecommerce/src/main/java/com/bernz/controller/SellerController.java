package com.bernz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.config.JwtProvider;
import com.bernz.domain.AccountStatus;
import com.bernz.exceptions.SellerException;
import com.bernz.model.Seller;
import com.bernz.model.VerificationCode;
import com.bernz.repository.VerificationCodeRepository;
import com.bernz.request.LoginRequest;
import com.bernz.response.AuthResponse;
import com.bernz.service.AuthService;
import com.bernz.service.EmailService;
import com.bernz.service.SellerService;
import com.bernz.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

    private final EmailService emailService;
    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {
        String email = req.getEmail();
        req.setEmail("seller_".concat(email));
        System.out.println("request: " + req.getEmail());
        AuthResponse authResponse = authService.signingUser(req);
        return ResponseEntity.ok(authResponse);
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable("otp") String otp) throws Exception {
        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong Otp");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);

        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {
        System.out.println("Create Seller1");
        // Creation of Seller
        Seller savedSeller = sellerService.createSeller(seller);

        // Generate otp & Save
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(savedSeller.getEmail());
        verificationCodeRepository.save(verificationCode);

        String subject = "Zosh Bazaar Email Verfication Code";
        String text = "Welcome to Bernz Bazaar, verify your account using this link ";
        String frontendUrl = "http://localhost:3000/verify-seller/" + otp;

        // Email service send
        emailService.sendVerificationOtpEmail(savedSeller.getEmail(), otp, subject, text + frontendUrl);
        return new ResponseEntity<>(savedSeller, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable("id") Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        System.out.println("getSeller By JWT "  + jwt);
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }
    
    // @GetMapping("/report")
    // public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception {
    //     Seller seller = sellerService.getSellerProfile(jwt);
    //     SellerReport sellerReport = sellerReportService.getSellerReport(seller);
    //     return new ResponseEntity<>(sellerReport, HttpStatus.OK);
    // }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(name = "status", required = false) AccountStatus status) throws Exception {
        List<Seller> sellers = sellerService.getAllSeller(status);
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {
        System.out.println("#seller: " + seller.getMobile());
        Seller profile = sellerService.getSellerProfile(jwt);

        // Update
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable("id") Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
