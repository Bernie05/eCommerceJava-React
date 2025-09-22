import { Divider } from "@mui/material";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";

const menus = [
  {
    name: "Order",
    path: "/account/orders",
  },
  {
    name: "Profile",
    path: "/account",
  },
  {
    name: "Saved Cards",
    path: "/account/saved-card",
  },
  {
    name: "Addresses",
    path: "/account/addresses",
  },
  {
    name: "Logout",
    path: "/",
  },
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: any) => {
    navigate(item.path);
  };

  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      {/* Headers */}
      <div>
        <h1 className="text-xl font-bold pb-5">Bernz</h1>
      </div>

      <Divider />

      {/* Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
          {menus.map((menu) => (
            <div
              onClick={() => handleClick(menu)}
              className={`py-3 cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md ${
                menu.path === location.pathname ? "bg-primary-color text-white" : ""
              }`}
            >
              <p>{menu.name}</p>
            </div>
          ))}
        </section>
        <section className="right lg:col-span-2 lg:pl-5 py-5">
          {/* The * that we added on the App.tsx will able to access all of this routes */}
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId/:orderItemId" element={<OrderDetails />} />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
