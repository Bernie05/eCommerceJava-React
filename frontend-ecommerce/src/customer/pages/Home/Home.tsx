import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
  return (
    <>
        <div className="space-y-5 lg:space-y-10 relative">
          {/* List of Electric Categories */}
          <ElectricCategory />

          {/* Grid Categories */}
          <CategoryGrid />

          {/* Deal */}
          <div className='py-20'>
            <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'>TODAY'S DEALS</h1>
               <Deal />
          </div>

          <section className='pt-20'>
            <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center'>SHOP BY CATEGORY</h1>
              <ShopByCategory />
          </section>

          <section className="lg:px-20 relative h-[200px] lg:h-[450px] object-cover">
            <img 
              className='w-full h-full' 
              src="" 
              alt="" 
            />

            <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
              <h1>Sell your Product</h1>
              <p className='text-lg md:text-2xl'>With <span className='logo'>Bernz Bazzar</span></p>
              
              <div className='pt-6 flex justify-center'>
                <Button startIcon={<Storefront />} variant='contained' size='large'>
                  Become Seller
                </Button>
              </div>
            </div>
          </section>
        </div>
    </>
  )
}

export default Home