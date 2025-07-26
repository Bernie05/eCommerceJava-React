import { Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <div className="px-5 py-3 space-y-4  max-h-79">
      <div className="flex justify-between item-center">
        <p>SubTotal</p>
        <span>PHP 1399</span>
      </div>

      <div className="flex justify-between item-center">
        <p>Discount</p>
        <span>PHP 600</span>
      </div>

      <div className="flex justify-between item-center">
        <p>Shipping</p>
        <span>PHP 79</span>
      </div>

      <div className="flex justify-between item-center">
        <p>Plateform fee</p>
        <span>Free</span>
      </div>

      <Divider />

      <div className="flex justify-between item-center p-1 text-primary-color">
        <p>Total</p>
        <span>PHP 799</span>
      </div>
    </div>
  );
};

export default PricingCard;
