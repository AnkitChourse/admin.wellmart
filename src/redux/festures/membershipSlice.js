import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllmemberships = createAsyncThunk("getAllmemberships", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleMembership = createAsyncThunk("getSingleMembership", async (data) => {
  try {
    return data;
  } catch (error) {
    return { data: null };
  }
});
export const getDisableMember = createAsyncThunk("getDisableMember", async ({ url }) => {
  try {
    const res = await http.put(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getUpdatememberships = createAsyncThunk("getUpdatememberships", async (url, data) => {
  try {
    const res = await axios.put(url, data, {
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
export const getCreatememberships = createAsyncThunk("getCreatememberships", async ({url, data}) => {
  try {
    const res = await axios.post(url, data, {
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
export const getDeletememberships = createAsyncThunk("getDeletememberships", async (url) => {
  try {
    const res = await axios.del(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

const membershipSlice = createSlice({
  name: "membershipSlice",
  initialState: {
    memberships: null,
    singlemembership: null,
    // subCategoryData: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllmemberships.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllmemberships.fulfilled, (state, action) => {
        state.Loading = false;
        state.memberships = action.payload?.data;
      })
      .addCase(getAllmemberships.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleMembership.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleMembership.fulfilled, (state, action) => {
        state.Loading = false;
        state.singlemembership = action.payload;
      })
      .addCase(getSingleMembership.rejected, (state, action) => {
        state.Loading = false;
      });
    //   .addCase(getGlobalCoupons.fulfilled, (state, action) => {
    //     state.Loading = false;
    //     state.coupons = action.payload?.data;
    //     // console.log(action.payload?.data);
    //   })
    //   .addCase(createCoupons.pending, (state, action) => {
    //     state.Loading = true;
    //   })
    //   .addCase(createCoupons.fulfilled, (state, action) => {
    //     state.Loading = false;
    //     // state.category = action.payload?.data;
    //   })
    //   .addCase(createCoupons.rejected, (state, action) => {
    //     state.Loading = false;
    //   })
    //   .addCase(getSingleCoupons.pending, (state, action) => {
    //     state.Loading = true;
    //   })
    //   .addCase(getSingleCoupons.fulfilled, (state, action) => {
    //     state.Loading = false;
    //     state.singleCoupons = action.payload?.data
    //     // state.subCategoryData = action.payload;
    //   })
    //   .addCase(getSingleCoupons.rejected, (state, action) => {
    //     state.Loading = false;
    //   });
  },
});
export default membershipSlice.reducer;
