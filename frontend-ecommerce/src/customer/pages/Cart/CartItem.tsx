import { Add, Remove } from '@mui/icons-material'
import { Button, Divider } from '@mui/material'
import React, { useState } from 'react'

const CartItem = () => {
    const [quantity, setQuantity] = useState(0);

    const handleUpdateQuantity = () => {
        
    }

    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div>
                    <img
                        className='w-[90px] rounded-md'
                        src='https://m.media-amazon.com/images/I/71JOCc43j3L._UY1100_.jpg'
                        alt=''
                    />
                </div>

                {/* Item Details*/}
                <div className='space-y-2'>
                    <h1 className="font-semibold text-lg">Urban Cloth</h1>
                    <p className='text-gray-600 font-medium text-sm'>Cloth sample</p>
                    <p className='text-gray-400 text-sm'><strong>Sold by:</strong> Natural Lifestyle Private Limited</p>
                    <p className='text-sm'>7 days replacement available</p>
                    <p className='text-sm text-gray-500'><strong>quantity:</strong> 5</p>
                </div>
            </div>
            
            <Divider />

            {/* Quantity */}
            <div className='px-5 py-2 flex justify-between items-center'>
                <div className='flex items-center gap-2 w-[140px] justify-between'>
                    <Button disabled={true} onClick={handleUpdateQuantity}>
                        <Remove />
                    </Button>
                    <span>{5}</span>
                    <Button onClick={handleUpdateQuantity}>
                        <Add />
                    </Button>
                </div>

                {/* Price */}
                <div>
                    <p className='text-gray-700 font-medium'>799</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem