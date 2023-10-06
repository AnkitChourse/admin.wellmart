import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllAppBanner = createAsyncThunk("getAllHomeBanner", async (url) => {
  try {
    const res = await http.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleAppBanner = createAsyncThunk("getSingleAppBanner", async (data) => {
  try {
    // const res = await http.get(url);

    return data;
  } catch (error) {
    return { data: null };
  }
});
export const updateSingleAppBanner = createAsyncThunk("updateSingleAppBanner", async ({url,data}) => {
  try {
    const res = await axios.put(url,data ,{
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      }});

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const createAppBanner = createAsyncThunk("createAppBanner", async ({url,data}) => {
  try {
    const res = await axios.post(url,data ,{
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      }});

    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const appBannerSlice = createSlice({
  name: "AppBannerSlice",
  initialState: {
    AllAppBanner: null,
    singleAppBanner: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
    appbannarLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllAppBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllAppBanner = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllAppBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleAppBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleAppBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleAppBanner = action.payload
        // console.log(action.payload?.data);
      })
      .addCase(getSingleAppBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createAppBanner.pending, (state, action) => {
        state.appbannarLoading = true;
      })
      .addCase(createAppBanner.fulfilled, (state, action) => {
        state.appbannarLoading = false;
      })
      .addCase(createAppBanner.rejected, (state, action) => {
        state.appbannarLoading = false;
      })
  },
});
export default appBannerSlice.reducer;
