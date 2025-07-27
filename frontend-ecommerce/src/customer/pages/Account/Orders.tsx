import React from 'react'
import OrderItem from './OrderItem'

const Orders = () => {
  return (
    <div className='text-sm min-h-screen'>
      <div className='pg-5'>
        <h1 className='font-semibold'>All Orders</h1>
        <p>From anytime</p>
      </div>

      <div className='pt-5'>
        {[1, 1, 1, 1, 1, 1].map(() => (
          <OrderItem />
        ))}
      </div>
    </div>
  )
}

export default Orders