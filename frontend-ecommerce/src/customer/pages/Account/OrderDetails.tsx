import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";

const OrderDetails = () => {
    const navigate = useNavigate();

  const handleClick = (id: string) => {
    // navigate
    navigate(`/reviews/${id}/create`)
  };

  const handleCancelOrder = () => {

  }

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

      {/* Delivery Address */}
      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>Bernz</p>
            <Divider />
            <p>093999999</p>
          </div>

          {/* Addresses */}
          <p>
            sample1, sample2, sample3, sample4, sample5
          </p>
        </div>
      </div>

      {/*  */}
      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>You saved <span className="text-primary-color font-medium text-xs">PHP 1000.00</span> on this item</p>
          </div>

          <p className="font-medium">PHP 1500.00</p>
        </div>

        <div className="px5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <Payments />
            <p>Pay on Delivery</p>
          </div>
        </div>
    
        <Divider />

        <div className="px-5 py-10">
          <p className="text-xs"><strong>Sold by: </strong>Urban Clothings</p>
        </div>

        <div className="p-10">
          <Button
            disabled={false}
            onClick={handleCancelOrder}
            color='error'
            sx={{ py: "0.7rem" }}
            variant="outlined"
            fullWidth
          >
            {true ? "order canceled" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
