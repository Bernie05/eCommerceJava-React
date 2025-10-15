import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk('seller/fetchProfile', async(jwt: string) => {
    try {
        const response = await api.get('/seller/profile', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });

        console.log('fetchSellerProfile res: ', response);

        return response.data;
    } catch(err) {
        console.error("Failed to fetch seller profile", err);
        throw err;
    }
});
