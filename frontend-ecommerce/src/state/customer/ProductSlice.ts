import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { IProduct } from "../../type/ProductType";

const PRODUCT_URL = 'products';

export const fetchProductById = createAsyncThunk("/products/fetchProductById", async (productId: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`${PRODUCT_URL}/${productId}`);

        return response.data;
    } catch(err) {
        console.log('Error fetchProductById product by ID:', err);
        return rejectWithValue(err);
    }
});

export const searchProduct = createAsyncThunk("/products/searchProduct", async (query: string, { rejectWithValue }) => {
    try {
        const response = await api.get(`${PRODUCT_URL}/search`, {
            params: { query }
        });

        return response.data;
    } catch(err) {
        console.log('Error searchProduct:', err);
        return rejectWithValue(err);
    }
});

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", async (params: any, { rejectWithValue }) => {
    try {
        const response = await api.get(`${PRODUCT_URL}`, {
            params: {
                ...params,
                pageNumber: params.pageNumber || 0,
            }
        });

        const data = response.data;
        console.log('All Products Data:', data);

        return data;
    } catch(err) {
        console.log('Error fetchAllProducts', err);
        return rejectWithValue(err);
    }
});

interface IProductState {
    products: IProduct[] | null;
    productDetails: IProduct | null;
    searchProducts: IProduct[] | null;
    totalPages: number
    loading: boolean;
    error: string | null;
}

const initialState: IProductState = {
    products: null,
    productDetails: null,
    searchProducts: null,
    totalPages: 0,
    loading: false,
    error: null,

}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // # fetchAllProducts
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message|| 'Failed to fetch product details';
            })
            // # searchProduct
             .addCase(searchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.searchProducts = action.payload.content;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message|| 'Failed to fetch product search results';
            })
            //# fetchAllProducts
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message|| 'Failed to fetch product list';
            })
    },
});

export default productSlice.reducer;