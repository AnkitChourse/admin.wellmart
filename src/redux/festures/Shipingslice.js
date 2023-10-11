import axios from "axios";
// import http from "Utils/api";
import http from "Utils/api2"
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllShiping = createAsyncThunk("getAllShiping", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res.data,"console.log(res.data)")
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleShiping = createAsyncThunk("getSingleTax", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res.data,"console.log(res.data)")
    return res.data;
  } catch (error) {
    return { data: null };
  }
});


export const updateShiping = createAsyncThunk("updatedataShiping", async ({url,data}) => {
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

const ShipingSlice = createSlice({
  name: "Shiping",
  initialState: {
    Shiping: null,
    singleShiping: null,
    Loading:false,
    updateLoading:false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllShiping.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllShiping.fulfilled, (state, action) => {
        state.Loading = false;
        state.Shiping = action.payload?.data;
        // console.log(action.payload, "fgdbgdvgujwbghdvewehdbewghdhewvd");
      })
      .addCase(getAllShiping.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleShiping.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleShiping.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleShiping = action.payload?.data;
        // console.log(action.payload, "fgdbgdvgujwbghdvewehdbewghdhewvd");
      })
      .addCase(getSingleShiping.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(updateShiping.pending, (state, action) => {
        state.updateLoading = true;
      })
      .addCase(updateShiping.fulfilled, (state, action) => {
        state.updateLoading = false;
      
       
      })
      .addCase(updateShiping.rejected, (state, action) => {
        state.updateLoading = false;
      })
  },
});
export default ShipingSlice.reducer;
