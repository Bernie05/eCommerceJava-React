import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export interface ILoginRequest {
  email: string;
  otp: string;
}

export const sendLoginSignupOTP = createAsyncThunk('/auth/sendLoginSignupOTP', async(email: string) => {
    try {
        const response = await api.post('/auth/sent/login-signup/otp', {
            email,
        });

        console.log('sendLoginSignupOTP res: ', response);
        return response.data;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});

export const signIn = createAsyncThunk<any, ILoginRequest>('/auth/signIn', async(data: ILoginRequest) => {
    const { email, otp } = data;

    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }
    try {
        const response = await api.post('/auth/signing', {
            email,
            otp,
        });

        console.log('signIn res: ', response.data);
        return response.data;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});