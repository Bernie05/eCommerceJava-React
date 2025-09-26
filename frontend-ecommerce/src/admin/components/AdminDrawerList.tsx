import React from "react";
import DrawerList from "../../component/DrawerList";
import {
    AccountBox,
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
} from "@mui/icons-material";

const menu1 = [
  {
    name: "SellerTable",
    path: "/admin",
    icon: <Dashboard className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Coupon",
    path: "/admin/coupon",
    icon: <IntegrationInstructions className="text-primary-color" />,
    activeIcon: <IntegrationInstructions className="text-white" />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Home Grid",
    path: "/admin/home-grid",
    icon: <Home className="text-primary-color" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Electronics Table",
    path: "/admin/electrocnics-category",
    icon: <ElectricBolt className="text-primary-color" />,
    activeIcon: <ElectricBolt className="text-white" />,
  },
  {
    name: "Shop by category",
    path: "/admin/shop-by-category",
    icon: <Category className="text-primary-color" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];

const menu2 = [
    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBox className='text-primary-color' />,
        activeIcon: <AccountBox className='text-white' />
    },
    {
        name: "Logout",
        path: "/",
        icon: <Logout className='text-primary-color' />,
        activeIcon: <Logout className='text-white' />
    }
]

const AdminDrawerList = ({ toggleDrawer }: any) => {
  return <DrawerList menu1={menu1} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;
