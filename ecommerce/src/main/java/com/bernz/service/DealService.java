package com.bernz.service;

import java.util.List;

import com.bernz.model.Deal;


public interface DealService {
    List<Deal> getDeals();
    Deal craeteDeal(Deal deal);
    Deal updateDeal(Long id, Deal deal) throws Exception;
    void deleteDeal(Long id) throws Exception;
}
