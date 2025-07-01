package com.bernz.service;

import java.util.List;

import com.bernz.model.Home;
import com.bernz.model.HomeCategory;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
