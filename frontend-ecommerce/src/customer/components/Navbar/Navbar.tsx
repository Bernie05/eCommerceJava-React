import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AddShoppingCart,
  FavoriteBorder,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { useState } from "react";
import { mainCategory } from "../../../data/category/mainCategory";
import { useNavigate, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [currHover, setCurrHover] = useState<string>("men");
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        {/* Main div */}
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          {/* Burger, Logo and categories */}
          <div className="flex items-center gap-9">
            {/* Burger and Logo */}
            <div className="flex items-center gap-2">
              {/* Burger Menu */}
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}

              {/* Logo */}
              <h1 onClick={() => navigate('/')} className="logo cursor-pointer text-lg md:text-2xl text-primary-color">
                Bernz Bazzar
              </h1>
            </div>

            {/* For Categories */}
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((category) => (
                <li
                  key={category.name}
                  onMouseEnter={() => {
                    setCurrHover(category.categoryId);
                    setShowCategory(true);
                  }}
                  onMouseLeave={() => setShowCategory(false)}
                  className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            {/* Search icon */}
            <IconButton>
              <SearchIcon />
            </IconButton>

            {/* Profile and User info */}
            {true ? (
              // Profile
              <Button 
                onClick={() => navigate(`/account/orders`)}
                className="flex items-center gap-2">
                <Avatar sx={{ width: 29, height: 29 }} src="" />
                {/* Name of user */}
                <h1 className="font-semibold hidden lg:block">Bernz</h1>
              </Button>
            ) : (
              // Login button
              <Button variant="contained">Login</Button>
            )}

            {/* Wishlist */}
            <IconButton>
              <FavoriteBorder sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton onClick={() => navigate('/cart')}>
              <AddShoppingCart
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>

            {/* Become Seller */}
            {isLarge && (
              <Button startIcon={<Storefront />} variant="outlined">
                Become Seller
              </Button>
            )}
          </div>
        </div>

        {/* Show & hide div */}
        {showCategory && (
          <div
            onMouseLeave={() => setShowCategory(false)}
            onMouseEnter={() => setShowCategory(true)}
            className="categorySheet absolute top-[4.39rem] left-20 right-20 border"
          >
            <CategorySheet selectedCategory={currHover} />
          </div>
        )}
      </Box>
    </>
  );
};

export default Navbar;
