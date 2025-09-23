import React from 'react'

import { useFormik } from 'formik'
import { TextField } from "@mui/material";

const SellerLoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: (values) => {
      // Handle login logic here
    },
  });

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
        )}

      </div>
    </div>
  )
}

export default SellerLoginForm