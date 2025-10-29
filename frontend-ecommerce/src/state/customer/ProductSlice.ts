import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const API_URL = 'http://localhost:5454';

export const fetchProductById = createAsyncThunk("", async (productId: string, thunkAPI) => {
    try {
        const response = await api.get(`${API_URL}/products/${productId}`);

        return response.data;
    } catch(err) {
        console.log('Error fetchProductById product by ID:', err);
        throw err;
    }
});

export const searchProduct = createAsyncThunk("", async (searchTerm: string, thunkAPI) => {
    try {
        const response = await api.get(`${API_URL}/products/search`, {
            params: { q: searchTerm }
        });

        return response.data;
    } catch(err) {
        console.log('Error searchProduct:', err);
        throw err;
    }
});