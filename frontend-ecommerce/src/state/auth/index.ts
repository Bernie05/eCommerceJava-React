import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { create } from "domain";

export interface ILoginRequest {
  email: string;
  otp: string;
}

export interface ISignUpRequest extends ILoginRequest {
    fullName: string;
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

export const signIn = createAsyncThunk<any, ILoginRequest>('/auth/signing', async(data: ILoginRequest) => {
    const { email, otp } = data;

    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }
    try {
        const response = await api.post('/auth/signing', {
            email,
            otp,
        });

        // store the jwt to local storage
        localStorage.setItem('jwt', response.data.jwt);

        console.log('signIn res: ', response.data);
        return response.data.jwt;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});

export const signUp = createAsyncThunk<any, ISignUpRequest>('/auth/signup', async(signUpReq: ISignUpRequest) => {

    try {
        const response = await api.post('/auth/signup', signUpReq);

        // store the jwt to local storage
        localStorage.setItem('jwt', response.data.jwt);

        console.log('signIn res: ', response.data);
        return response.data.jwt;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});

export const logout = createAsyncThunk<any, any>('/auth/logout', async(navigate) => {
    try {
        localStorage.clear();
        navigate('/');
    }
    catch(err) {
        console.error("Failed to logout", err);
    }
});

export const fetchUserProfile = createAsyncThunk<any, string>('/api/user/profile', async(jwt) => {

    try {
        const response = await api.get('/api/user/profile', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        console.log('User Profile: ', response.data);
        return response.data;
    } catch(err) {
        console.error("Failed to fetch auth profile", err);
        throw err;
    }
});

interface IAuthState {
    jwt: string | null;
    otpSent: boolean;
    isLoggedIn: boolean;
    user: any;
}

const initialState: IAuthState = {
    jwt: null,
    otpSent: false,
    isLoggedIn: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        })
    }
});