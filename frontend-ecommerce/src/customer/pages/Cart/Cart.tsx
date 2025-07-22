import React, { useState } from 'react'
import CartItem from './CartItem'
import { LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Button, Divider, TextField } from '@mui/material'
import PricingCard from './PricingCard'

const Cart = () => {
    const [couponCode, setCouponCode] = useState("");  
      
    const handleCouponChange = (e: any) => {
        const coupon = e.target.value;

        setCouponCode(coupon);
    }

    const handleApplyCoupon = () => {
        
    }

    const handleRedirectCheckoutPage = () => {
        
    }

    return (
        <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {/* col-2 */}
                <div className='cartItemSection lg:col-span-2 space-y-3'>
                    {[1, 1, 1, 1, 1, 1,].map(() => (
                        <CartItem />
                    ))}
                </div>
                {/* col-1 total of lg:grid-cols-3*/}
                <div className='col-span-1 text-sm space-y-3'>
                    <div className='border rounded-md px-5 py-3 space-y-5'>
                        <div className='flex gap-3 text-sm items-center'>
                            <div className='flex gap-3 text-sm items-center'>
                                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
                            </div>
                            <span>Apply Coupon</span>
                        </div>

                        <div className='flex justify-between item-center gap-3'>
                            <TextField 
                                className='w-full'
                                onChange={handleCouponChange}
                                placeholder="Enter Coupon Code" 
                                size="small" 
                                variant="outlined"
                                value={couponCode}
                            />
                            <Button onClick={handleApplyCoupon} className="w-[20%]" size="small" variant="contained">Apply</Button>
                        </div>
                    </div>

                    {/* Pricing Cart */}
                    <div className='border rounded-md'>
                        <PricingCard />
                        <div className='p-2'>
                            <Button 
                                fullWidth
                                sx={{ py: "11px" }} 
                                variant="contained"
                                onClick={handleRedirectCheckoutPage}
                            >
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart