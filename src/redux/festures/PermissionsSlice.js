import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllPermissions = createAsyncThunk("getAllPermissions", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res.data,"console.log(res.data)")
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const PermissionsSlice = createSlice({
  name: "PermissionsSlice",
  initialState: {
    permissions: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllPermissions.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.Loading = false;
        state.permissions = action.payload?.permission;
        // console.log(action.payload?.permission, "fgdbgdvgujwbghdvewehdbewghdhewvd");
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default PermissionsSlice.reducer;
