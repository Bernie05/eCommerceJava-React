import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginRequest } from "../auth";
import { api } from "../../config/Api";

export const sellerLogin = createAsyncThunk<any, ILoginRequest>('/seller/sellerLogin', async(data: ILoginRequest) => {
    const { email, otp } = data;

    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }
    try {
        const response = await api.post('/sellers/login', {
            email,
            otp,
        });

        // store the jwt token in the local storage
        const jwt = response.data.token;
        localStorage.setItem('jwt', jwt);

        console.log('sellerLogin res: ', response.data);
        return response.data;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});