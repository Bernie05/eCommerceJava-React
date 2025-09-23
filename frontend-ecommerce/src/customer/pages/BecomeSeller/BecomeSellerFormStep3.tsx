import { TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep3 = ({ formik }: any) => {

  return (
    <div className="space-y-5">
        <p className="text-xl font-bold text-center pb-5">Bank Details</p>
        <TextField 
            fullWidth
            name="bankDetails.accountNumber"
            label="Account Number"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
            helperText={formik.errors.bankDetails?.accountNumber}
        />
        <TextField
            fullWidth
            name="bankDetails.ifscCode"
            label="IFSC Code"
            value={formik.values.bankDetails.ifscCode}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
            helperText={formik.errors.bankDetails?.ifscCode}
        />
        <TextField
            fullWidth
            name="bankDetails.accountHolderName"
            label="Account Holder Name"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
            helperText={formik.errors.bankDetails?.accountHolderName}
        />
    </div>
  )
}

export default BecomeSellerFormStep3