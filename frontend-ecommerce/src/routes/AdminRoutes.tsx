import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SellerTables from "../admin/pages/seller/SellerTables";
import Coupon from "../admin/pages/coupon/Coupon";
import AddCouponForm from "../admin/pages/coupon/AddCouponForm";
import GridTable from "../admin/pages/homePage/GridTable";
import ElectronicsTable from "../admin/pages/homePage/ElectronicsTable";
import ShopByCategoryTable from "../admin/pages/homePage/ShopByCategoryTable";
import Deal from "../admin/pages/homePage/Deal";

const AdminRoutes = () => {
  const location = useLocation();

  console.log("AdminRoutes in Route Current location:", location.pathname);
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellerTables />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/add-coupon" element={<AddCouponForm />} />
        <Route path="/home-grid" element={<GridTable />} />
        <Route path="/electrocnics-category" element={<ElectronicsTable />} />
        <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
        <Route path="/deals" element={<Deal />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
