import axios from "axios";
// import http from "Utils/api";
import http from "Utils/api2"
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllCoupons = createAsyncThunk("getAllCoupons", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleCoupons = createAsyncThunk("getSingleCoupons", async (data) => {
  try {
    // const res = await http.get(url);
    return data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalCoupons = createAsyncThunk("getGlobalCoupons", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

// export const creatCategoryData = createAsyncThunk("creatCategoryData", async ({ url, data }) => {
//   const response = await axios({
//     method: "post",
//     url: url,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     data: data,
//   })
//     .then((response) => response)
//     .catch((error) => error.response);

//   return response.data;
// });

export const updateCoupons = createAsyncThunk("updateCoupons", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(...data, "data");
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const deleteCoupons = createAsyncThunk("deleteCoupons", async ({ url }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const createCoupons = createAsyncThunk("createCoupons", async ({ url, data}) => {
  // console.log(url, "url");
  // console.log(JSON.parses(data), "data");
  // console.log(data, "data");
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
// console.log(response)
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
const couponSlice = createSlice({
  name: "couponSlice",
  initialState: {
    coupons: null,
    singleCoupons: null,
    // subCategoryData: null,
    Loading: false,
    createupdateLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.Loading = false;
        state.coupons = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalCoupons.fulfilled, (state, action) => {
        state.Loading = false;
        state.coupons = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createCoupons.pending, (state, action) => {
        state.createupdateLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.createupdateLoading = false;
        // state.category = action.payload?.data;
      })
      .addCase(updateCoupons.rejected, (state, action) => {
        state.createupdateLoading = false;
      })
      .addCase(updateCoupons.pending, (state, action) => {
        state.createupdateLoading = true;
      })
      .addCase(updateCoupons.fulfilled, (state, action) => {
        state.createupdateLoading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.createupdateLoading = false;
      })
      .addCase(getSingleCoupons.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleCoupons.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleCoupons = action.payload
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleCoupons.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default couponSlice.reducer;
