import React from 'react'

import { useFormik } from 'formik'
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from '../../../state/store';
import { send } from 'process';
import { sendLoginSignupOTP, signIn } from '../../../state/auth';
import { sellerLogin } from '../../../state/seller/selletAuthSlice';

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: (values) => {
      const { email, otp } = values;

      if (email && otp) {
        console.log('login');
        dispatch(sellerLogin({ email, otp }));
      } else {
        console.error('Email and OTP are required for login');
      }
    },
  });

  const handleSendOTP = () => {
    const email = formik.values.email;
    if (email) {
      console.log('send otp');
      dispatch(sendLoginSignupOTP(email))
    }
  }

  return (
    <div>
      <h1 className='text-center font-bold text-xl text-primary-color pb-5'>
        Login As Seller
      </h1>
      <div className='space-y-5'>
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
            <div className='space-y-2'>
              <p className='font-medium text-sm opacity-50'>Enter OTP sent to your email</p>
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
            <Button fullWidth variant="contained" sx={{ py: "11px"}} type="button" onClick={handleSendOTP}>
              Send OTP
            </Button>

            <Button fullWidth variant="contained" sx={{ py: "11px"}} onClick={() => formik.handleSubmit}>
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default SellerLoginForm