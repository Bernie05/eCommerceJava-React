import React from "react";
import { Formik, useFormik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { filterData } from "../../../data/filter/filterData";
import { mainCategory } from "../../../data/category/mainCategory";
import {
  categoryThree,
  categoryTwo,
  filterChildByHeaderCategoryId,
} from "../../../customer/components/Navbar/CategorySheet";

const AddProduct = () => {
  const [uploadImage, setUploadImage] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "men",
      category2: "men",
      category3: "men_topwear",
      sizes: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true); // to load the circular progress
    // upload to to cloudinary it return as the image url
    const image = await uploadToCloudinary(file);

    // set the image to formik
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImage = [...formik.values.images];
    updatedImage.splice(index, 1);
    formik.setFieldValue("images", updatedImage);
  };

  console.log("formik1: ", formik.values.category);
  console.log("formik2: ", formik.values.category2);
  console.log("formik3: ", formik.values.category3);
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-700" fontSize="large" />
              </span>

              {/* Image to upload*/}
              {uploadImage && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            {/* Form */}
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    className="w-24 h-24 object-cover"
                    key={index}
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />

                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=""
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: 16 }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* Form */}
          {/* Title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              fullWidth
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>

          {/* Grid of lg: 3 */}
          {/* MRP Price */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          {/* Selling Price */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid>

          {/* Color */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                label="Color"
                value={formik.values.color}
                onChange={formik.handleChange}
              >
                {filterData.colors.map(({ name, hex }, index) => (
                  <MenuItem value={name} key={index}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: hex }}
                        className={`h-4 w-5 rounded-full mt-1 ${
                          name === "White" ? "border" : ""
                        }`}
                      />
                      <p className="ml-5">{name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Size */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                label="Size"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                {filterData.colors.map(({ name, hex }, index) => (
                  <MenuItem value={name} key={index}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: hex }}
                        className={`h-4 w-5 rounded-full mt-1 ${
                          name === "White" ? "border" : ""
                        }`}
                      />
                      <p className="ml-5">{name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* End of Grid of lg: 3 */}

          {/* Grid of lg: 4 */}
          {/* Category 1 */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {mainCategory.map(
                  ({ name, categoryId }, index) => (
                    <MenuItem value={categoryId} key={index}>
                      <div className="flex gap-3">
                        <p>{name}</p>
                      </div>
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Category 2 */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category2-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                label="Second Category"
                value={formik.values.category2}
                onChange={formik.handleChange}
              >
                {categoryTwo[formik.values.category].map(
                  ({ name, categoryId, parentCategoryId }, index) => (
                    <MenuItem value={categoryId} key={index}>
                      <div className="flex gap-3">
                        <p className="ml-5">{name}</p>
                      </div>
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Category 3 */}
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={
                formik.touched.category3 && Boolean(formik.errors.category3)
              }
              required
            >
              <InputLabel id="category3-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                label="Third Category"
                value={formik.values.category3}
                onChange={formik.handleChange}
              >
                {filterChildByHeaderCategoryId(
                  categoryThree[formik.values.category],
                  formik.values.category2
                ).map(({ categoryId, name }: any, index: number) => (
                  <MenuItem value={categoryId} key={index}>
                    <div className="flex gap-3">
                      <p className="ml-5">{name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* End of Grid of lg: 4 */}
          <Grid size={{ xs: 12 }}>
            <Button fullWidth className="bg-primary-color" variant="contained">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProduct;
