import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";

const OrderDetails = () => {
    const navigate = useNavigate();

  const handleClick = (id: string) => {
    // navigate
    navigate(`/reviews/${id}/create`)
  };

  return (
    <Box className="space-y-5">
        {/* Product Details */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <img className="w-[100px] h-[100px] border" src="" alt="" />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">Title</h1>
          <p>Sample Title</p>
          <p>
            <strong>Size: </strong>M
          </p>
        </div>

        <div>
          <Button onClick={() => handleClick("2")}>Write Review</Button>
        </div>
      </section>

      {/* Ship details */}
      <div className="border p-5">
        <OrderStepper orderStatus={"DELIVERED"} />
      </div>
    </Box>
  );
};

export default OrderDetails;
