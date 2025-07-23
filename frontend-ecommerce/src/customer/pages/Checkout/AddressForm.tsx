import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/),
  pinCode: Yup.string().required("Pin code is required").matches(/^[1-9][0-9]{5}$/),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  locality: Yup.string().required("locality is required")
});

const AddressForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log("values", values);
    }
  });

  return (
    <Box>
        <p className='text-xl font-bold text-center pb-5'>Contact Details</p>
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <TextField 
                  fullWidth
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                />
              </Grid>

              <Grid size={6}>
                <TextField 
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.errors.mobile}
                />
              </Grid>

              <Grid size={6}>
                <TextField 
                  fullWidth
                  name="pinCode"
                  label="PinCode"
                  value={formik.values.pinCode}
                  onChange={formik.handleChange}
                  error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                  helperText={formik.errors.pinCode}
                />
              </Grid>

              <Grid size={12}>
                <TextField 
                  fullWidth
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.errors.address}
                />
              </Grid>

              <Grid size={12}>
                <TextField 
                  fullWidth
                  name="city"
                  label="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.errors.city}
                />
              </Grid>
              <Grid size={6}>
                <TextField 
                  fullWidth
                  name="state"
                  label="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.errors.state}
                />
              </Grid>

              <Grid size={6}>
                <TextField 
                  fullWidth
                  name="locality"
                  label="Locality"
                  value={formik.values.locality}
                  onChange={formik.handleChange}
                  error={formik.touched.locality && Boolean(formik.errors.locality)}
                  helperText={formik.errors.locality}
                />
              </Grid>

              <Grid size={12}>
                <Button fullWidth size="medium" variant="contained" type="submit">Add address</Button>
              </Grid>
            </Grid>
        </form>
    </Box>
  )
}

export default AddressForm