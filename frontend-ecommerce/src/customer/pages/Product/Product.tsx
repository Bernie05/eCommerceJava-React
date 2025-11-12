import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchProduct } from "../../../services/fetchProduct";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../state/customer/ProductSlice";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const products = useAppSelector((state) => state.product.products) || [];

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get('price')?.split("-") || [];
    const color = searchParams.get('color');
    const minDiscount = Number(searchParams.get('discount')) || 0;
    const pageNumber = page-1 || 1;

    const filterObj = {
      color: color || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      pageNumber,
    }

    dispatch(fetchAllProducts(filterObj));
  }, [category, dispatch, searchParams]);

  return (
    <div className="-z-10 mt-10">
      {/* Header Title */}
      <h1 className="text-3xl text-center font-bold text-gray-800 pb-5 px-9 uppercase space-x-2">
        {" "}
        Women T shirt
      </h1>

      {/* Product */}
      <div className="lg: flex">
        {/* Filter Section Left */}
        <section className="filterSection hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        {/* All Product Section Right*/}
        <div className="w-full lg:w-[80%] space-y-5">
          {/* Selection for filter & filter icon, clear  sort*/}
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="">Sort</InputLabel>
              <Select
                labelId="test"
                id="test"
                value={sort}
                label="test"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_heigh"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {products.map((item) => (
              <ProductCard item={item} />
            ))}
          </section>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
