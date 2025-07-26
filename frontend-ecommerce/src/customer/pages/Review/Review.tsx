import React from "react";
import ReviewCard from "./ReviewCard";
import { Divider, LinearProgress, Rating } from "@mui/material";

const Review = () => {
  const getRatingChart = () => {
    return [
      {
        name: "Excellent",
        color: "#22c55e", // green
        value: 90,
      },
      {
        name: "Very Good",
        color: "#4ade80", // light green
        value: 70,
      },
      {
        name: "Good",
        color: "#facc15", // yellow
        value: 50,
      },
      {
        name: "Average",
        color: "#fbbf24", // orange
        value: 30,
      },
      {
        name: "Poor",
        color: "#ef4444", // red
        value: 5,
      },
    ];
  };

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        {/* Product Image */}
        <img
          src="https://dynamic.zacdn.com/tcGl3DY3nPGa69zCg5jm5dBkPnI=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/quirkyt-7068-7307303-1.jpg"
          alt=""
        />

        {/* Product details */}
        <div>
          <div>
            <p className="font-bold text-xl">Raam Clothing</p>
            <p className="text-lg text-gray-600">Womens Violet sihirt</p>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-semibold text-gray-800">PHP 400</span>
              <span className="line-through text-gray-400">PHP 700</span>
              <span className="text-primary-color">60%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5 w-full">
        <h1 className="font-semibold"> Review & Ratings</h1>
        {/* Implement the Rating and Line progress for Excellent, Very Good, Good, Average and Poor */}
        <div className="border p-5 px-5">
          <div className="flex items-center">
            <Rating value={4.5} precision={0.5} />
            Ratings
          </div>

          <div className="pt-5">
            {getRatingChart().map((r) => (
              <div className="flex items-center p-1">
                <div className="w-[90px]">
                  <p>{r.name}</p>
                </div>
                <div className="w-[90%]">
                  <LinearProgress
                    variant="determinate"
                    value={r.value}
                    sx={{
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: r.color,
                      },
                    }}
                  />
                </div>
                <p className="w-[10%] pl-8">{`${r.value}%`}</p>
              </div>
            ))}
          </div>
          {/* <div className='p-10 border'>
             <div className='flex items-center w-[100%]'>
              {getRatingChart().map((rating) => (
                <>
                  <p className='pb-1'>{rating.name}</p>
                  <LinearProgress sx={{ width: 100 }} variant="determinate" value={rating.value} />
                  <p className='pb-1'>{rating.value}</p>
                  </>
              ))}
              </div>

          </div> */}
        </div>
        <div>
          {[1, 1, 1, 1, 1].map((item) => (
            <div className="space-y-3">
              <ReviewCard />
              <Divider />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Review;
