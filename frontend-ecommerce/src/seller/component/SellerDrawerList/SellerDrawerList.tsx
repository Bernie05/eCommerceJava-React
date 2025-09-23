import { AccountBalanceWallet, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material';
import React from 'react'
import DrawerList from '../../../component/DrawerList';

const menu1 = [
    {
        name: "Dashboard",
        link: "/seller",
        icon: <Dashboard className="text-primary-color" />,
        activeIcon: <Dashboard className="text-white" />
    },
    {
        name: "Orders",
        link: "/seller/orders",
        icon: <ShoppingBag className="text-primary-color" />,
        activeIcon: <ShoppingBag className="text-white" />
    },
    {
        name: "Products",
        link: "/seller/products",
        icon: <Inventory className="text-primary-color" />,
        activeIcon: <Inventory className="text-white" />
    },
    {
        name: "Add Product",
        link: "/seller/add-product",
        icon: <Add className="text-primary-color" />,
        activeIcon: <Add className="text-white" />
    },
    {
        name: "Payment",
        link: "/seller/payment",
        icon: <AccountBalanceWallet className="text-primary-color" />,
        activeIcon: <AccountBalanceWallet className="text-white" />
    },
    {
        name: "Transactions",
        link: "/seller/transactions",
        icon: <Receipt className="text-primary-color" />,
        activeIcon: <Receipt className="text-white" />
    }
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

const SellerDrawerList = () => {
  return (
    <div>
        <DrawerList menu1={menu1} menu2={menu2} toggleDrawer={()=>{}} />
    </div>
  )
}

export default SellerDrawerList