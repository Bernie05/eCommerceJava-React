import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from '../seller/pages/SellerDashboard/Dashboard'
import Order from '../seller/pages/Order/Order'
import AddProduct from '../seller/pages/Product/AddProduct'
import Payment from '../seller/pages/Transaction/Payment'
import Transaction from '../seller/pages/Transaction/Transaction'
import Product from '../seller/pages/Product/Product'
import Profile from '../seller/pages/Account/Profile'

const SellerRoutes = () => {
    const location = useLocation();

    console.log("SellerRoutes in Route Current location:", location.pathname);
    return (
        <div>
            <Routes>
                {/* Section 1 */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/products" element={<Product />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/transactions" element={<Transaction />} />

                {/* Section 2 */}
                <Route path="/account" element={<Profile />} />
            </Routes>
        </div>
    )
}

export default SellerRoutes