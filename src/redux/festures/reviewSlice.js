import http from "Utils/api";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const isgetAllReview = createAsyncThunk("isgetAllReview", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const isgetSingleReview = createAsyncThunk("isgetSingleReview", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

export const updateReview = createAsyncThunk("updateReview", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(data, "data");
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await axios.put(url, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState: {
    onLoading: false,
    singleReview: null,
    review: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isgetAllReview.pending, (state, action) => {
        state.onLoading = true;
      })
      .addCase(isgetAllReview.fulfilled, (state, action) => {
        state.onLoading = false;
        state.review = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(isgetAllReview.rejected, (state, action) => {
        state.onLoading = false;
      })
      .addCase(isgetSingleReview.pending, (state, action) => {
        state.onLoading = true;
      })
      .addCase(isgetSingleReview.fulfilled, (state, action) => {
        state.onLoading = false;
        state.singleReview = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(isgetSingleReview.rejected, (state, action) => {
        state.onLoading = false;
      });
  },
});
export default reviewSlice.reducer;
