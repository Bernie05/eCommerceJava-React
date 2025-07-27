import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";

const OrderItem = () => {
  const handleOnClick = () => {

  }

  return (
    <div onClick={handleOnClick} className="text-sm bg-white p-5 m-2 border rounded-md cursor-pointer">
      {/* Icon & Arriving */}
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[500]}}>
            <ElectricBolt />
          </Avatar>
        </div>

        <div>
          <h1 className="font-bold text-primary-color">PENDING</h1>
          <p className="text-sm">Arriving By July 28, 2025</p>
        </div>
      </div>

      {/* Details Information */}
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img className="w-[70px] h-[70px]" src="" alt="" />
        </div>

        <div className="w-full space-y-2">
          <h1 className="font-bold">
            Sample Text
          </h1>
          <p>Sample Details</p>
          <p><strong>Size: </strong> Free</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
