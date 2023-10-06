import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllCity = createAsyncThunk("getAllCity", async (url) => {
    try {
        const res = await http.get(url);
        return res.data;
    } catch (error) {
        return { data: null };
    }
});
export const getAllCityWithoutLoading = createAsyncThunk("getAllCityWithoutLoading", async (url) => {
    try {
        const res = await http.get(url);
        return res.data;
    } catch (error) {
        return { data: null };
    }
});

export const updateCity = createAsyncThunk("updateCity", async ({ url, data }) => {
    try {
        const response = await http.put(url, data);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const createCity = createAsyncThunk("createCity", async ({ url, data }) => {
    try {
        const response = await http.post(url, data);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
});
const citySlice = createSlice({
    name: "citySlice",
    initialState: {
        city: null,
        // subCategoryData: null,
        Loading: false,
        createUpdateLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCity.pending, (state, action) => {
                state.Loading = true;
            })
            .addCase(getAllCity.fulfilled, (state, action) => {
                state.Loading = false;
                state.city = action.payload?.data?.reverse();
                // console.log(action.payload?.data);
            })
            .addCase(getAllCityWithoutLoading.fulfilled, (state, action) => {
                state.city = action.payload?.data?.reverse();
                // console.log(action.payload?.data);
            })
            .addCase(getAllCity.rejected, (state, action) => {
                state.Loading = false;
            })
            .addCase(createCity.pending, (state, action) => {
                state.createUpdateLoading = true;
            })
            .addCase(createCity.fulfilled, (state, action) => {
                state.createUpdateLoading = false;
                // state.category = action.payload?.data;
            })
            .addCase(createCity.rejected, (state, action) => {
                state.createUpdateLoading = false;
            })
            .addCase(updateCity.pending, (state, action) => {
                state.createUpdateLoading = true;
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                state.createUpdateLoading = false;
                // state.category = action.payload?.data;
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.createUpdateLoading = false;
            })
    },
});
export default citySlice.reducer;
