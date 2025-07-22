import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange = () => {

    }

    return (
        <div>
            <div className='flex pt-5 border rounded-md'>
                <div>
                    <Radio 
                        checked={true}
                        onChange={handleChange}
                        value=""
                        name="radio-button"
                    />
                </div>

                {/* Address Details */}
                <div className='space-y-3 p-3'>
                    <h1>Zosh</h1>
                    <p className='w-[320px]'>Test - 12312</p>
                    <p><strong>Mobile: </strong> 0999999</p>
                </div>
            </div>
        </div>
    )
}

export default AddressCard