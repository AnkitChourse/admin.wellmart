import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllSubscribe = createAsyncThunk("getAllSubscribe", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res.data,"console.log(res.data)")
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const SubscribeSlice = createSlice({
  name: "Subscribe",
  initialState: {
    Subscribe: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllSubscribe.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllSubscribe.fulfilled, (state, action) => {
        state.Loading = false;
        state.Subscribe = action.payload?.data;
        // console.log(action.payload, "fgdbgdvgujwbghdvewehdbewghdhewvd");
      })
      .addCase(getAllSubscribe.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default SubscribeSlice.reducer;
