package com.bernz.service.impl;

import org.springframework.stereotype.Service;

import com.bernz.model.Seller;
import com.bernz.model.SellerReport;
import com.bernz.repository.SellerReportRepository;
import com.bernz.service.SellerReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerReportImpl implements SellerReportService{
    private final SellerReportRepository sellerReportRepository;

    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());

        if (sellerReport == null) {
            SellerReport newSellerReport = new SellerReport();
            newSellerReport.setSeller(seller);

            // save the report
            return sellerReportRepository.save(newSellerReport);
        }

        return sellerReport;
    }

    @Override
    public SellerReport updatedSellerReport(SellerReport sellerReport) {
        return sellerReportRepository.save(sellerReport);
    }
}
