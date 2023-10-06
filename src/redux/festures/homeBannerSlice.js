import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllHomeBanner = createAsyncThunk("getAllHomeBanner", async (url) => {
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
export const getSingleHomeBanner = createAsyncThunk("getSingleHomeBanner", async (data) => {
  try {
    // const res = await http.get(url);

    return data;
  } catch (error) {
    return { data: null };
  }
});
export const updateHomeBanner = createAsyncThunk("updateHomeBanner", async ({url,data}) => {
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
export const createHomeBanner = createAsyncThunk("createHomeBanner", async ({url,data}) => {
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

const homeBannerSlice = createSlice({
  name: "homeBannerSlice",
  initialState: {
    AllHomeBanner: null,
    singleHomeBanner: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
    createHomeLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHomeBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllHomeBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllHomeBanner = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllHomeBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleHomeBanner.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleHomeBanner.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleHomeBanner = action.payload
        // console.log(action.payload?.data);
      })
      .addCase(getSingleHomeBanner.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createHomeBanner.pending, (state, action) => {
        state.createHomeLoading = true;
      })
      .addCase(createHomeBanner.fulfilled, (state, action) => {
        state.createHomeLoading = false;
      })
      .addCase(createHomeBanner.rejected, (state, action) => {
        state.createHomeLoading = false;
      })
      .addCase(updateHomeBanner.pending, (state, action) => {
        state.createHomeLoading = true;
      })
      .addCase(updateHomeBanner.fulfilled, (state, action) => {
        state.createHomeLoading = false;
      })
      .addCase(updateHomeBanner.rejected, (state, action) => {
        state.createHomeLoading = false;
      })
  },
});
export default homeBannerSlice.reducer;
