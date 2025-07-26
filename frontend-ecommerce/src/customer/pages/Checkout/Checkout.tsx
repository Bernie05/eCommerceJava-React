import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg",
    label: "",
  },
  {
    value: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png",
    label: "",
  },
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateWay, seyPaymentGateWay] = useState("RAZORPAY");

  const handlePaymentChange = (e: any) => {
    seyPaymentGateWay(e.target.value);
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            {/* Header  */}
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>ADD NEW ADDRESS</Button>
            </div>

            {/* 20:15:00 */}
            {/* Address Card */}
            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>
              <div className="space-y-3">
                {[1, 1, 1, 1].map(() => (
                  <AddressCard />
                ))}
              </div>
            </div>

            {/* Button Address */}
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add new address</Button>
            </div>
          </div>

          <div className="border rounded-md max-h-[450px]">
            <div className=" space-y-3 p-5">
              <h1 className="font-medium text-primary-color pb-2 text-center">
                Choose Payment Gateway
              </h1>
              <FormControl>
                <RadioGroup
                  row
                  name="payment-radio-group"
                  className="flex justify-between items-center pl-6"
                  onChange={handlePaymentChange}
                  value={paymentGateWay}
                >
                  {paymentGatewayList.map((payment) => (
                    <FormControlLabel
                      className="w-[45%] flex rounded-md border"
                      value={payment.value}
                      control={<Radio />}
                      label={
                        <img
                          className={`${
                            payment.value === "STRIPE" ? "w-12 h-4" : ""
                          }`}
                          src={payment.image}
                          alt=""
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <Divider />

            <PricingCard />
            <div className="p-5">
              <Button fullWidth variant="contained" sx={{ py: "11px" }}>
                Check out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
