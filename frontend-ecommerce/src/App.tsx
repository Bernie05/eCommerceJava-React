import React from 'react';
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
import OrderDetails from './customer/pages/Account/OrderDetails';
import { Route, Routes } from 'react-router-dom';

function App() {
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

            <Route path="/account/*" element={<Account />} />
          </Routes>
        </div>
      </ThemeProvider>
  );
}

export default App;
