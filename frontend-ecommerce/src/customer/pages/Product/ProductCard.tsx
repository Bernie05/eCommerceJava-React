import React, { useEffect, useState } from 'react'
import './css/ProductCard.css'
const images = [
    "https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg", 
    "https://m.media-amazon.com/images/I/71JOCc43j3L._UY1100_.jpg"
]

const ProductCard = () => {
    const [currImg, setCurrImg] = useState(0);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        // interval of 3sec -> 
        // +1 if >= len image back to zero
        let interval:any;
        if (isHover) {
            interval = setInterval(() => {
                // Ex. if we 4 images
                // 0%4 = 0 1%4 = 1, 2%4 = 2, 3%4 = 3, 4%4 = 0
                setCurrImg((prevImage) => (prevImage + 1) % images.length);
            }, 1000);
        }
        else if (interval) {
            clearInterval(interval);
            interval = null;
        }

        return () => clearInterval(interval);
    }, [isHover]);

    return (
        <>
            <div className="group px-4 relative">
                <div className="card"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                {
                    images.map((item, index) => (
                        <img 
                            style={{
                                transform: `translateX(${(index - currImg) * 100}%)`
                            }}
                            className="card-media object-top"
                            src={item}
                            alt='' 
                        />
                    ))
                }
                </div>
            </div>
        </>
    )
}

export default ProductCard