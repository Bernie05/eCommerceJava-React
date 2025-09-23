import React, { act } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';
import BecomeSeller from './BecomeSeller';
import { Formik, useFormik } from 'formik';
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import * as Yup from 'yup';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

const SellerAccountForm = () => {
    const steps = ['Tax Details & Mobile', 'Pick up Address', 'Bank Details', 'Supplier Details'];
    const [activeStep, setActiveStep] = React.useState(0);

    const formik = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            gstin: "",
            pickupAddress: {
                name: "",
                mobile: "",
                pinCode: "",
                address: "",
                city: "",
                locality: "",
                state: "",
            },
            bankDetails: {
                accountHolderName: "",
                accountNumber: "",
                ifscCode: "",
            },
            sellerName: "",
            email: "",
            businessDetails: {
                businessName: "",
                businessEmail: "",
                businessMobile: "",
                logo: "",
                banner: "",
                businessAddress: "",
            },
            password: ""
        },
        onSubmit: (values) => {
            console.log("values", values);
        },
    });
    

    const handleCreateAccount = () => {
        // api call to create seller account
        alert("Account Created Successfully");
    }

    const handleStep = (currValue: number, step: number) => {
        if ((activeStep >= 0 && activeStep <= steps.length - 1) || step < 0) {
            setActiveStep(currValue + step);
            if(currValue + step === steps.length) {
                handleCreateAccount();
            }
        }
        console.log(activeStep);
    }

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>

            {/* Render the form here */}
            <section className='mt-20 space-y-10'>
               <div>
                    {/* 22:25:41 */}
                    {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
                    {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
                    {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
                    {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
               </div>

                {/* Button Back and Continue */}
                <div className='flex item-center justify-between'>
                    <Button variant='contained' disabled={activeStep === 0} onClick={() => handleStep(activeStep, -1)}>
                        Back
                    </Button>
                    <Button variant='contained' onClick={() => handleStep(activeStep, 1)}>
                        {activeStep >= steps.length - 1 ? "Create Account" : "Continue"}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default SellerAccountForm