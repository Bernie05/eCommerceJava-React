package com.bernz.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bernz.domain.HomeCategorySection;
import com.bernz.model.Deal;
import com.bernz.model.Home;
import com.bernz.model.HomeCategory;
import com.bernz.repository.DealRepository;
import com.bernz.service.HomeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
    private final DealRepository dealRepository;

    // Edited
    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {
        List<HomeCategory> gridCategories = new ArrayList<>();
        List<HomeCategory> shopByCategories = new ArrayList<>();
        List<HomeCategory> electricCategories = new ArrayList<>();
        List<HomeCategory> dealCategories = new ArrayList<>();

        for (HomeCategory category : allCategories) {
            if (category.getSection() == HomeCategorySection.GRID) {
                gridCategories.add(category);
            }
            else if (category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES) {
                shopByCategories.add(category);
            }
            else if (category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES) {
                electricCategories.add(category);
            }
            else if (category.getSection() == HomeCategorySection.DEALS) {
                dealCategories.add(category);
            }
        }

        //
        List<Deal> createdDeals = new ArrayList<>();

        if (dealRepository.findAll().isEmpty()) {
            List<Deal> deals = dealCategories.stream().map(category -> new Deal(null, 10, category))
                .collect(Collectors.toList());

            createdDeals = dealRepository.saveAll(deals);
        }
        else {
            createdDeals = dealRepository.findAll();
        }
        
        // Build our home page dynamic setup
        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
