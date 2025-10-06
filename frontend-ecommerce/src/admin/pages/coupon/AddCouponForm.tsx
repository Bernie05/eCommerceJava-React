import React from 'react'
import { useFormik } from 'formik'
import { Dayjs } from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Grid } from '@mui/system';
import { Button, TextField } from '@mui/material';

interface CouponFormValues {
  code: string,
  discountPercentage: number,
  validityStartDate: Dayjs | null,
  validityEndDate: Dayjs | null,
  minimumOrderValue: number,
}

const AddCouponForm = () => {
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values: CouponFormValues) => {
      const formattedValues = {
        ...values,
        validityStartDate: (values && values.validityStartDate) ? (values.validityStartDate).toISOString() : null,
        validityEndDate: (values && values.validityEndDate) ? (values.validityEndDate).toISOString() : null,
      }

      console.log("formattedValues values: ", formattedValues);
    }
  })

  return (
    <div>
      <h1 className='text-2xl font-bold text-primary-color pb-5 text-center'> Create new Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6}}>
              <TextField
                fullWidth
                name="code"
                label="Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.errors.code}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6}}>
              <TextField
                fullWidth
                name="discountPercentage"
                label="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                helperText={formik.errors.discountPercentage}
              />
            </Grid>

            {/* Date Picker */}
            <Grid size={{ xs: 12, sm: 6}}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validatity Start Date" 
                name="validityStartDate"
                onChange={formik.handleChange}
                value={formik.values.validityStartDate}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6}}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validatity End Date" 
                name="validityEndDate"
                onChange={formik.handleChange}
                value={formik.values.validityEndDate}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                helperText={formik.errors.minimumOrderValue}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button variant='contained' fullWidth sx={{ py: ".8rem"}}>Create Coupon</Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  )
}

export default AddCouponForm