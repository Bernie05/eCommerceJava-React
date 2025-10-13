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
import { Route, Routes } from 'react-router-dom';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/dashboard/AdminDashboard';
import { fetchProduct } from './services/fetchProduct';


function App() {
  useEffect(() => {
    console.log("App component mounted");


    // const getRecords = async () => {
    //   const record = await fetchProduct();
    //   console.log('record retrieved in backend:', record);
    // };


    // getRecords()
    fetchProduct();
  }, []);

  return (
      <ThemeProvider theme={customTheme}>
        <Navbar />
      <div>
          <Routes>
            <Route path="/" element={<Home />}/>
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
