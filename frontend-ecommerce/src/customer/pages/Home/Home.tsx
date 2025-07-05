import React from 'react'
import ElectricCategory from './ElectricCategory'

const Home = () => {
  return (
    <>
        <div className="space-y-5 lg:space-y-10 relative">
            {/* List of Categories */}
            <ElectricCategory />
        </div>
    </>
  )
}

export default Home