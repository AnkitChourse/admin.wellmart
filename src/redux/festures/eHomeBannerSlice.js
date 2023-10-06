import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllEHomeBanner = createAsyncThunk("getAllEHomeBanner", async (url) => {
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
export const getSingleEHomeBanner = createAsyncThunk("getSingleEHomeBanner", async (data) => {
  try {
    // const res = await http.get(url);

    return data;
  } catch (error) {
    return { data: null };
  }
});
export const updateEHomeBanner = createAsyncThunk("updateEHomeBanner", async ({url,data}) => {
  try {
    const res = await axios.put(url,data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const createEHomeBanner = createAsyncThunk("createEHomeBanner", async ({url,data}) => {
  try {
    const res = await axios.post(url,data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const homeEBannerSlice = createSlice({
  name: "eHomeBannerSlice",
  initialState: {
    AllEHomeBanner: null,
    singleEHomeBanner: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
    createUpdateloading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEHomeBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllEHomeBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllEHomeBanner = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllEHomeBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleEHomeBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleEHomeBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleEHomeBanner = action.payload
        // console.log(action.payload?.data);
      })
      .addCase(getSingleEHomeBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createEHomeBanner.pending, (state, action) => {
        state.createUpdateloading = true;
      })
      .addCase(createEHomeBanner.fulfilled, (state, action) => {
        state.createUpdateloading = false;
      
        // console.log(action.payload?.data);
      })
      .addCase(createEHomeBanner.rejected, (state, action) => {
        state.createUpdateloading = false;
      })
      .addCase(updateEHomeBanner.pending, (state, action) => {
        state.createUpdateloading = true;
      })
      .addCase(updateEHomeBanner.fulfilled, (state, action) => {
        state.createUpdateloading = false;
      
        // console.log(action.payload?.data);
      })
      .addCase(updateEHomeBanner.rejected, (state, action) => {
        state.createUpdateloading = false;
      })
  },
});
export default homeEBannerSlice.reducer;
