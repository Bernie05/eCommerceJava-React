import React from 'react'

const SimilarProductCard = () => {
  return (
    <>
        <div className="group px-4 relative">
        {/* Card Images & Button*/}
        <div className="card">
            {/* Card */}
            {
                <img 
                    className="card-media object-top"
                    src="https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg"
                    alt='' 
                />
            }
        </div>

        {/* Card Details */}
        <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
            <div>
                <h1>Uni</h1>
                <p>Blue Shirt</p>
            </div>
            <div className='price flex items-center gap-3'>
                <span className='font-semibold text-gray-800'>
                    PHP 400
                </span>
                <span className='thin-line-through text-gray-400'>
                    PHP 700
                </span>
                <span className='text-primary-color'>
                    60%
                </span>
            </div>
        </div>
    </div>
    </>
  )
}

export default SimilarProductCard