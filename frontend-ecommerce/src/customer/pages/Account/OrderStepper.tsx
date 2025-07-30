import {
  CheckCircle as CheckCircleIcon,
  FiberManualRecord as FiberManualRecordIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  {
    name: "Order Placed",
    description: "on Thu, 11 Jul",
    value: "PLACED",
  },
  {
    name: "Packed",
    description: "on Thu, 12 Jul",
    value: "CONFIRM",
  },
  {
    name: "Shipped",
    description: "on Thu, 13 Jul",
    value: "SHIPPED",
  },
  {
    name: "Arriving",
    description: "on Thu, 14 Jul",
    value: "ARRIVING",
  },
  {
    name: "Arrived",
    description: "on Thu, 14 Jul",
    value: "DELIVERED",
  },
];

const cancelledStep = [
  {
    name: "Order Placed",
    description: "on, Thu 14, Jul",
    value: "PLACED",
  },
  {
    name: "Order Canceled",
    description: "on, Thu 14, Jul",
    value: "CANCELLED",
  },
];

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  const currentStep = steps.findIndex(i => i.value === orderStatus);

  useEffect(() => {
    // check if the status is CANCELLED
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancelledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="mx-auto my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                // If the CurrentStep is 2 meaning all the value from 0-2 is already done
                // the rest is not yet so it is fall on the else gray
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "bg-gray-200 text-teal-500"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircleIcon />
                ) : (
                  <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                )}
              </Box>

              {/* This is the line */}
              {index < statusStep.length - 1 && (
                <div
                  className={`border h-20 w-[2px] ${
                    index < currentStep
                      ? "border-primary-color"
                      : "border-gray-300 text-gray-600"
                  }`}
                />
              )}
            </div>

            {/* Details 21:00:00*/}
            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                } ${orderStatus === "CANCELLED" && step.value === orderStatus ? "bg-red-500" : "" } w-full`}
              >
                <p>{step.name}</p>
                <p className={`${step.value === orderStatus? "text-gray-200" : "text-gray-500"} text-xs`}>
                    {step.description}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
