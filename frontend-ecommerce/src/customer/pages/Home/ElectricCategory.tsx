import React from 'react'
import ElectricCategoryCard from './ElectricCategoryCard'

function ElectricCategory() {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {[1, 1].map(() => (
            <ElectricCategoryCard />
        ))}
    </div>
  )
}

export default ElectricCategory