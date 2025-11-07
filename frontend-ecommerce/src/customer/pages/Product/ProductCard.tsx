import React, { useEffect, useState } from "react";
import "./css/ProductCard.css";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Favorite, ModeComment } from "@mui/icons-material";
import { IProduct } from "../../../type/ProductType";
// const images = [
//   "https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg",
//   "https://m.media-amazon.com/images/I/71JOCc43j3L._UY1100_.jpg",
// ];

interface IProductCardProps {
  item: IProduct;
}

const ProductCard = ({ item }: IProductCardProps) => {
  const [currImg, setCurrImg] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // interval of 3sec ->
    // +1 if >= len image back to zero
    let interval: any;
    if (isHover) {
      interval = setInterval(() => {
        // Ex. if we 4 images
        // 0%4 = 0 1%4 = 1, 2%4 = 2, 3%4 = 3, 4%4 = 0
        setCurrImg((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }

    return () => clearInterval(interval);
  }, [isHover]);

  return (
    <>
      <div className="group px-4 relative">
        {/* Card Images & Button*/}
        <div
          className="card"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Card */}
          {item.images.map((item, index) => (
            <img
              style={{
                // -100 shift to left
                // 0 stay in original position
                // 100 > shift to the right
                transform: `translateX(${(index - currImg) * 100}%)`,
              }}
              className="card-media object-top"
              src={item}
              alt=""
            />
          ))}
          {/* Cards Buttons */}
          {isHover && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-3">
                <Button variant="contained" color="secondary">
                  <Favorite sx={{ color: teal[500] }} />
                </Button>
                <Button variant="contained" color="secondary">
                  <ModeComment sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Card Details */}
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div>
            <h1>{item.seller?.businessDetails.businessName}</h1>
            <p>{item.title}</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-semibold text-gray-800">{item.sellingPrice}</span>
            <span className="thin-line-through text-gray-400">{item.mrpPrice}</span>
            <span className="text-primary-color">{item.discountPercentage}%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
