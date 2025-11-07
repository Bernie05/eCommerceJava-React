import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../state/store'
import { logout } from '../state/auth'

interface MenuItem {
    name: string,
    path?: string,
    icon: React.ReactNode,
    activeIcon: React.ReactNode
}

interface DrawerListProps {
    menu1: Array<MenuItem>,
    menu2: Array<MenuItem>,
    toggleDrawer: Function
}

const DrawerList = ({ menu1, menu2, toggleDrawer} : DrawerListProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const handleLogout = () => {
        dispatch(logout(navigate))
    }

    return (
        <div className="h-full">
            <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
                <div className='space-y-2'>
                    {menu1.map((item, index) => (
                        <div onClick={() => {
                            navigate(item.path!);
                            if (item.name === "Logout") handleLogout();
                        }} key={index} className='pr-9 cursor-pointer'>
                            <div className={`${item.path === location.pathname ? 
                                    'bg-primary-color text-white' : 'text-primary-color'} flex items-center px-5 py-3 rounded-r-full`}>
                                <ListItemIcon>
                                    {item.path===location.pathname ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </div>
                        </div>
                    ))}
                </div>

                <Divider />

                <div className='space-y-2'>
                    {menu2.map((item, index) => (
                        <div onClick={() => navigate(item.path!)} key={index} className='pr-9 cursor-pointer'>
                            <div className={`${item.path === location.pathname ? 
                                    'bg-primary-color text-white' : 'text-primary-color'} flex items-center px-5 py-3 rounded-r-full`}>
                                <ListItemIcon>
                                    {item.path===location.pathname ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DrawerList