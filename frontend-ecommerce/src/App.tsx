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

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          {/* <Home /> */}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Review /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}
          <Account />
          {/* <OrderDetails /> */}
        </div>
      </ThemeProvider>
  );
}

export default App;
