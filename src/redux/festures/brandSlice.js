import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBrands = createAsyncThunk("getBrands", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleBrands = createAsyncThunk("getSingleBrands", async (data) => {
  try {
    // const res = await http.get(url);
    // return res.data;
    return data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalBrands = createAsyncThunk("getGlobalBrands", async (url) => {
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

export const updateBrands = createAsyncThunk("updateBrands", async ({ url, data }) => {
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
export const deleteBrands = createAsyncThunk("deleteBrands", async ( url ) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));
  try {
    const response = await axios.delete(url, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const createBrands = createAsyncThunk("createBrands", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await axios.post(url, data, {
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
const brandSlice = createSlice({
  name: "brandSlice",
  initialState: {
    brands: null,
    singleBrands: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.Loading = false;
        state.brands = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalBrands.fulfilled, (state, action) => {
        state.Loading = false;
        state.brands = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createBrands.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleBrands.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleBrands.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleBrands = action.payload
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleBrands.rejected, (state, action) => {
        state.IsLoading = false;
      });
  },
});
export default brandSlice.reducer;
