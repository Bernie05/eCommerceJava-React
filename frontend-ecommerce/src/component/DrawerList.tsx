import React from 'react'

interface MenuItem {
    name: string,
    link?: string,
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
  return (
    <div className="h-full">
        <div className='flex flex-col justify-between h-full border-r py-5'>
            <div>
                <div className='space-y-2'>
                    {menu1.map((item, index) => (
                        <div key={index} className='flex items-center space-x-2'>
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DrawerList