package com.bernz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bernz.model.Order;
import com.bernz.model.PaymentOrder;
import com.bernz.model.Seller;
import com.bernz.model.SellerReport;
import com.bernz.model.User;
import com.bernz.repository.TransactionReporitory;
import com.bernz.response.ApiResponse;
import com.bernz.response.PaymentLinkResponse;
import com.bernz.service.PaymentService;
import com.bernz.service.SellerReportService;
import com.bernz.service.SellerService;
import com.bernz.service.TransactionService;
import com.bernz.service.UserService;


import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final TransactionService transactionService;
    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHanler(@PathVariable String paymentId, 
        @RequestParam String paymentLinkId, @RequestHeader("Authorizatin") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        
        PaymentLinkResponse paymentResponse;
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentId);

        boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if (paymentSuccess) {   
            // Create Transaction, Reprot
            for(Order order : paymentOrder.getOrders()) {
                transactionService.createTransaction(order);

                // Build the report
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);
                report.setTotalOrders(report.getTotalOrders() + 1);
                report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());

                // Update the Report
                sellerReportService.updatedSellerReport(report);
            }
        }

        ApiResponse res = new ApiResponse();
        res.setMessage("Payment Success");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
