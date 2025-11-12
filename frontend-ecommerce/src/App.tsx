import React, { useEffect } from 'react';
import './App.css';
import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/dashboard/AdminDashboard';
import { AppSellerState, fetchSellerProfile } from './state/seller/sellerSlice';
import { useAppDispatch, useAppSelector } from './state/store';
import Auth from './customer/pages/Auth/Auth';


function App() {
  const dispatch = useAppDispatch();  
  const { seller } = useAppSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products on app load
    const getJwt = localStorage.getItem('jwt') || '';

    dispatch(fetchSellerProfile(getJwt));
  }, [dispatch]);

  useEffect(() => {
    if (seller.profile) {
      navigate('/seller/profile');
    }
  }, [seller.profile]);

  return (
      <ThemeProvider theme={customTheme}>
        <Navbar />
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/product/:category" element={<Product />} />
            <Route path="/review/:productId" element={<Review />} />
            <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* able to access all account related routes */}
            <Route path="/account/*" element={<Account />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/seller/*" element={<SellerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </ThemeProvider>
  );
}

export default App;
