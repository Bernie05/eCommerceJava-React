package com.bernz.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bernz.model.Deal;
import com.bernz.model.HomeCategory;
import com.bernz.repository.DealRepository;
import com.bernz.repository.HomeCategoryRepository;
import com.bernz.service.DealService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal craeteDeal(Deal deal) {
        Deal newDeal = new Deal();
        HomeCategory homeCategory = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        newDeal.setCategory(homeCategory);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Long id, Deal deal) throws Exception {
        Deal existingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if (existingDeal != null) {
            if (deal.getDiscount() != null) {
                existingDeal.setDiscount(deal.getDiscount());
            }

            if (category != null) {
                existingDeal.setCategory(category);
            }

            return dealRepository.save(existingDeal);
        }

        throw new Exception("Deal not found");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(() -> new Exception("Deal not found"));
        dealRepository.delete(deal);
    }
}
