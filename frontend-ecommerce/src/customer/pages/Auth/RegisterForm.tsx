import React from "react";
import { useAppDispatch } from "../../../state/store";
import { useFormik } from 'formik'
import { sendLoginSignupOTP } from "../../../state/auth";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("formData: ", values);
    },
  });

  const handleSendOTP = () => {
    const email = formik.values.email;
    if (email) {
      dispatch(sendLoginSignupOTP(email));
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        RegisterForm
      </h1>
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
      />
      {true && (
        <>
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-50">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
            type="button"
            onClick={handleSendOTP}
          >
            Send OTP
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
            onClick={() => formik.handleSubmit}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
