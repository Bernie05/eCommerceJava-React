import React from 'react'

const CategoryGrid = () => {
  return (
    // Main Grid
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        {/* Left Large Image */}
        <div className='col-span-3 row-span-12 text-white'>
           <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>

        <div className='col-span-4 row-span-6 text-white'>
            <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>

        <div className='col-span-3 row-span-12 text-white'>
            <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>

        <div className='col-span-4 row-span-6 text-white'>
            <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="" 
                alt=''
            />
        </div>
    </div>
  )
}

export default CategoryGrid