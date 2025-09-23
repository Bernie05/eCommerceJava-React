import { TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
         <div className="space-y-5">
            <p className="text-xl font-bold text-center pb-5">Supplier Details</p>
            <TextField
                fullWidth
                name="businessDetails.businessName"
                label="Business Name"
                value={formik.values.businessDetails.businessName}
                onChange={formik.handleChange}
                error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
                helperText={formik.errors.businessDetails?.businessName}
            />
            <TextField
                fullWidth
                name="SellerName"
                label="Seller Name"
                value={formik.values.SellerName}
                onChange={formik.handleChange}
                error={formik.touched.SellerName && Boolean(formik.errors.SellerName)}
                helperText={formik.errors.SellerName}
            />
            <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.errors.email}
            />
            <TextField
                fullWidth
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.errors.password}
            />
        </div>
    )
}

export default BecomeSellerFormStep4