import axios from "axios";
// import http from "Utils/api";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllprice = createAsyncThunk("getAllprice", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleprice = createAsyncThunk("getSingleprice", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const updateprice = createAsyncThunk("updateprice", async ({ url, data }) => {
  try {
    const res = await axios.put(url, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const createprice = createAsyncThunk("createprice", async ({ url, data }) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const PricerangeSlice = createSlice({
  name: "PricerangeSlice",
  initialState: {
    price: null,
    singleprice: null,
    createUpdateLoading: false,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllprice.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllprice.fulfilled, (state, action) => {
        state.Loading = false;
        state.price = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllprice.rejected, (state, action) => {
        state.Loading = false;
      })

      .addCase(getSingleprice.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleprice.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleprice = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getSingleprice.rejected, (state, action) => {
        state.Loading = false;
      })

      .addCase(updateprice.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateprice.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateprice.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createprice.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createprice.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createprice.rejected, (state, action) => {
        state.createUpdateLoading = false;
      });
  },
});
export default PricerangeSlice.reducer;
