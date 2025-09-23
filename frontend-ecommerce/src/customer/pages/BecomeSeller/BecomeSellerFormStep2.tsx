import { Box, Button, Grid, TextField } from "@mui/material";

const BecomeSellerFormStep2 = ({ formik } : any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pb-5">Pickup Address</p>
      <>
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
        </Grid>
      </>
    </Box>
  );
};

export default BecomeSellerFormStep2;
