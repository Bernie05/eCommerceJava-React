import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { IProduct } from "../../type/ProductType";

interface ISellerProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: ISellerProductState = {
    products: [],
    loading: false,
    error: null,
}

const sliceName ="sellerProduct";

export const fetchSellerProducts = createAsyncThunk<IProduct[], string | undefined>(`/${sliceName}/fetchSellerProducts`, 
    async (jwt: string | undefined) => {
    try {
            const response = await api.get("/sellers/products", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const data = response.data as IProduct[];
            console.log("Product created successfully", data);
            return data;
        } catch(error) {
            console.error("Failed to fetch seller products", error);
            throw error;
        }
    }
);

export const createProduct = createAsyncThunk<IProduct, { reqProduct: any, jwt: string | undefined }>(`/${sliceName}/createProduct`,
    async (args) => {
        const { reqProduct, jwt } = args;

        try {
            const response = await api.post("/sellers/products", reqProduct, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            const data = response.data; 
            console.log("Product created successfully", data);
            return data;
        } catch (error) {
            console.log("Failed to create product", error);
            throw error;
        }
    }
);

// # Seller Product Slice
const sellerProductSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // for fetchSellerProducts
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch seller products";
        });

        // for createProduct
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch seller products";
        });
    }
})

export default sellerProductSlice.reducer;
export const AppSellerProductState = (state: { sellerProduct: ISellerProductState }) => state.sellerProduct;