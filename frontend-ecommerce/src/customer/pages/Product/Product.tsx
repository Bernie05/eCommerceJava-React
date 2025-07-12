import React, { useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [sort, setSort] = useState();

    const handleSortChange = (e : any) => {

    }

    return (
        <div className='-z-10 mt-10'>
            <h1 className='text-3xl text-center font-bold text-gray-800 pb-5 px-9 uppercase space-x-2'> Women T shirt</h1>
            <div className='lg: flex'>
                {/* Filter Section Left */}
                <section className="filterSection hidden lg:block w-[20%]">
                    <FilterSection />
                </section>

                {/* All Product Section Right*/}
                <div className='w-full lg:w-[80%] space-y-5'>
                    {/* Selection for filter & filter icon, clear  sort*/}
                    <div className='flex justify-between items-center px-9 h-[40px]'>
                        <div className='relative w-[50%]'>
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
                        <FormControl size="small" sx={{ width: "200px"}}>
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
                    <section className="productSection">
                        <ProductCard />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Product