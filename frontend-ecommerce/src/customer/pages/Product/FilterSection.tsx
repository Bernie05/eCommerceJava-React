import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { teal } from '@mui/material/colors'
import { filterData } from '../../../data/filter/filterData';
// import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {
  const { colors, prices, discounts } = filterData;
  console.log( { colors, discounts })
  const [expandColor, setExpandColor] = useState(false);
  // const [searchParams, setSearhParams] = useSearchParams();
   
  const updateFilterParams = () => {

  }

  return (
    <div 
      className='-z-50 space-y-5 bg-white'
    >
      {/* Header Filter & Button Clear all */}
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold'>
          Filters
        </p>
        <Button size='small' className="text-teal-600 cursor-pointer font-semibold">
          clear all
        </Button>
      </div>

      <Divider />

      <div className='px-9 space-y-6'>
        {/* Color Section */}
        <section>
          <FormControl>
            <FormLabel
              id="color"
              className='text-2xl font-semibold'
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px"
              }}
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby='color'
              defaultValue=""
              name="color"
            >
              {colors.slice(0, expandColor ? colors.length : 5).map((color:any) => (
                <FormControlLabel 
                  key={color.name} 
                  value={color.value} 
                  control={<Radio />} 
                  label={
                    <div className='flex items-center gap-3'>
                      <p>{color.name}</p>
                      <p 
                        style={{ backgroundColor: color.hex}} 
                        className={`h-5 w-5 rounded-full ${color.name === "White" ? "border 2px solid black" : ""}"`} />
                    </div>
                } />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <Button
              className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center'
              onClick={() => setExpandColor(!expandColor)}>
              {expandColor ? "hide" : `+${colors.length - 5} more` }
            </Button>
          </div>
        </section>

        <Divider />
        
        {/* Price Section */}
        <section>
          <FormControl>
            <FormLabel
              id="color"
              className='text-2xl font-semibold'
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px"
              }}
            >
              Price
            </FormLabel>
          </FormControl>
          <RadioGroup
            name="price"
            onChange={() => updateFilterParams}
            aria-labelledby='price'
            defaultValue=""
          >
            {prices.map((price: any) => (
             <FormControlLabel 
                key={price.name}
                value={price.value} 
                control={<Radio size='small'/>} 
                label={price.name}
              />
            ))}
          </RadioGroup>
        </section>
        
        <Divider />

        {/* Discount Section*/}
        <section>
          <FormControl>
            <FormLabel
              id="color"
              className='text-2xl font-semibold'
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px"
              }}
            >
              Discount
            </FormLabel>
          </FormControl>
          <RadioGroup
            name="discount"
            onChange={() => updateFilterParams}
            aria-labelledby='discount'
            defaultValue=""
          >
            {discounts.map((price: any) => (
             <FormControlLabel 
                key={price.name}
                value={price.value} 
                control={<Radio size='small'/>} 
                label={price.name}
              />
            ))}
          </RadioGroup>
        </section>
      </div>

    </div>
  )
}

export default FilterSection