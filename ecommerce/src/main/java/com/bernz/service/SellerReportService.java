package com.bernz.service;

import com.bernz.model.Seller;
import com.bernz.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updatedSellerReport(SellerReport sellerReport);
}
