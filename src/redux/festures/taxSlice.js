import axios from "axios";
// import http from "Utils/api";
import http from "Utils/api2"
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllTax = createAsyncThunk("getAllTax", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleTax = createAsyncThunk("getSingleTax", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const updateTax = createAsyncThunk("updateTax", async ({url,data}) => {
  try {
    const res = await axios.put(url,data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        authorization: localStorage.getItem("token"),
      }});
    console.log(res.data)
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const taxSlice = createSlice({
  name: "taxSlice",
  initialState: {
    tax: null,
    singleTax: null,
    // subCategoryData: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTax.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllTax.fulfilled, (state, action) => {
        state.Loading = false;
        state.tax = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllTax.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleTax.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleTax.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleTax = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getSingleTax.rejected, (state, action) => {
        state.Loading = false;
      })
     
  },
});
export default taxSlice.reducer;
