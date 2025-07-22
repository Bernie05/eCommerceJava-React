import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Checkout = () => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
                    <div className='col-span-2 space-y-5'>
                        {/* Header  */}
                        <div className='flex justify-between items-center'>
                            <h1 className="font-semibold">Select Address</h1>
                            <Button>
                                ADD NEW ADDRESS
                            </Button>
                        </div>

                        {/* Address Card */}
                        <div className='text-xs font-medium space-y-5'>
                            <p>Saved Address</p>
                            <div className='space-y-3'>
                                {[1, 1, 1].map(() => (
                                    <AddressCard />
                                ))}
                            </div>
                        </div>

                        {/* Button Address */}
                        <div className='py-4 px-5 rounded-md border'>
                            <Button onClick={handleOpen}>Add new address</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm />
                </Box>
            </Modal>
        </> 
    )
}

export default Checkout