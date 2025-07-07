import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, FavoriteBorder, Storefront } from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div>
      <Box>
   
        {/* Main div */}
        <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
 
          {/* Burger, Logo and categories */}
          <div className="flex items-center gap-9">

            {/* Burger and Logo */}
            <div className='flex items-center gap-2'>

                {/* Burger Menu */}
                {!isLarge && (
                  <IconButton>
                      <MenuIcon />
                  </IconButton>
                )}

                {/* Logo */}
                <h1 className='logo cursor-pointer text-lg md:text-2xl text-primary-color'>
                  Bernz Bazzar
                </h1>
            </div>

            {/* For Categories */}
            <ul className="flex items-center font-medium text-gray-800">
              {
                ["Men", "Women", "Home & Furniture", "Electronics"].map((category) => (
                  <li className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center">
                    {category}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='flex gap-1 lg:gap-6 items-center'>
            {/* Search icon */}
            <IconButton>
              <SearchIcon />
            </IconButton>

            {/* Profile and User info */}
            {
              !isLarge? (
                // Profile 
                <Button className='flex items-center gap-2'>
                  <Avatar 
                    sx={{ width: 29, height: 29 }}
                    src =''
                  />
                  {/* Name of user */}
                  <h1 className='font-semibold hidden lg:block'>
                    Bernz
                  </h1>
                </Button>
              ) : (
                // Login button
                <Button variant='contained'>
                  Login
                </Button>
              )
            }

            {/* Wishlist */}
            <IconButton>
              <FavoriteBorder sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton>
              <AddShoppingCart className="text-gray-700" sx={{ fontSize: 29 }}  />
            </IconButton>

            {/* Become Seller */}
            {isLarge && (
                <Button startIcon={<Storefront />} variant="outlined">
                  Become Seller
                </Button>
              )
            }
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Navbar