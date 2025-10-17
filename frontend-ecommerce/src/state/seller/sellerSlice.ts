import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

interface ISellerProfile {
    sellers: any[];
    selectedSeller: any | null;
    profile: any | null;
    report: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: ISellerProfile = {
    sellers: [],
    selectedSeller: null,
    profile: null,
    report: null,
    error: null,
    loading: false,
}

const sellerSlice = createSlice({
    name: 'sellers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // first level builder - pending response not yet received
            .addCase(fetchSellerProfile.pending, (state) => {              
                state.loading = true;
            })
            // second level builder - fulfilled response already received
            .addCase(fetchSellerProfile.fulfilled, (state, action) => {   
                state.loading = false;
                state.profile = action.payload;
            })
            // third level builder - rejected response with error
            .addCase(fetchSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch seller profile';
            });
    },
});

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


// export the reducer to be used in the store
export default sellerSlice.reducer;
export const AppSellerState = (state: { seller: ISellerProfile }) => state.seller;