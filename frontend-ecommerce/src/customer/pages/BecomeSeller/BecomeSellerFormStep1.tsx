import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik } : any) => {
  return (
    <Box>
      {/* Header */}
      <p className="text-xl font-bold text-centter pb-90">Contact Details</p>

      {/* Form */}
      <div className="space-y-9">
        {/* Mobile */}
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.errors.mobile}
        />
        {/* GSTIN */}
        <TextField
          fullWidth
          name="gstin"
          label="GSTIN"
          value={formik.values.gstin}
          onChange={formik.handleChange}
          error={formik.touched.gstin && Boolean(formik.errors.gstin)}
          helperText={formik.errors.gstin}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
