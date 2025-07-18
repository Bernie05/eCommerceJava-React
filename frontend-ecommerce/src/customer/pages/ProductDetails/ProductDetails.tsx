import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';

const ProductDetails = () => {
  let [quantity, setQuantity] = useState(1);

  return (
    <div className='px-5 lg:px-20 pt-10'>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

        {/* Images */}
        <section className='flex flex-col lg:flex-row gap-5'>
          {/* 4 Image */}
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {[1, 1, 1, 1].map(() => (
              <img
                className='lg:w-full w-[50px] cursor-pointer rounded-md'
                src='https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg' 
                alt='' 
              />
            ))}
          </div>

          {/* 1 Image */}
          <div className='w-full lg:w-[85%]'>
            <img
              className='w-full rounded'
              src='https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg' 
              alt='' 
            />
          </div>
        </section>

        {/* Details */}
        <section>
          <h1 className='font-bold text-lg text-primary-color'>Details Title</h1>
          <p className="text-gray-500 font-semibold">Women black shirt</p>

          {/* Rating Section */}
          <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>

            {/* Divider */}
            <Divider orientation='vertical' flexItem/>
            <span>234 Ratings</span>
          </div>

          {/* Product Prices & offer*/}
          <div>
            <div className='price flex items-center gap-3 mt-5 text-2xl'>
              <span className='font-semibold text-gray-800'>
                  PHP 400
              </span>
              <span className='line-through text-gray-400'>
                  PHP 700
              </span>
              <span className='text-primary-color'>
                  60%
              </span>
            </div>

            <p className="text-sm">Inclusive of all taxes. Free shipping above Php 1000</p>
          </div>

          {/* Assurance */}
          <div className='mt-7 space-y-3'>

            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>

            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back gurantee</p>
            </div>

            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>

            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          {/* Quantity */}
          <div className='mt-7 space-y-2'>
            <h1>QUANTITY</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity === 1} onClick={() => setQuantity(quantity--)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity++)}>
                <Add />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className='mt-12 flex items-center gap-5'>
            <Button 
              fullWidth
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              variant="contained"
            > 
              Add to bag
            </Button>
            <Button
              fullWidth
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
              variant="outlined"
            > 
              Add to wishlist
            </Button>
          </div>

          {/*  */}
          <div className="mt-5">
            <p>Sample Description Sample Description Sample Description Sample Description Sample Description Sample Description
              Sample Description Sample Description Sample Description Sample Description Sample Description Sample Description
              Sample Description Sample Description.
            </p>
          </div>

          {/* Review Card */}
        </section>
      </div>

      {/* Similar Product */}
      <div className='mt-20'>
        <h1 className="text-lg font-bold">Similar Product</h1>

        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails