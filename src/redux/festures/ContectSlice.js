import axios from "axios";
// import http from "Utils/api";
import http from "Utils/api2"
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllContect = createAsyncThunk("getAllTax", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});



const ContectSlice = createSlice({
  name: "ContectSlice",
  initialState: {
    contect: null,
   
  
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContect.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllContect.fulfilled, (state, action) => {
        state.Loading = false;
        state.contect = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllContect.rejected, (state, action) => {
        state.Loading = false;
      })
    
     
  },
});
export default ContectSlice.reducer;
