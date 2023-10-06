import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getEHomeProduct = createAsyncThunk("getEHomeProduct", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleEHomeProduct = createAsyncThunk("getSingleEHomeProduct", async (data) => {
  try {
    // const res = await http.get(url);
    // return res.data;
    return data;
  } catch (error) {
    return { data: null };
  }
});

export const updateSingleEHomeProduct = createAsyncThunk(
  "updateSingleEHomeProduct",
  async ({ url, data }) => {
    try {
      const res = await axios.put(url, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
          // "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return { data: null };
    }
  }
);
export const createEHomeProduct = createAsyncThunk("createEHomeProduct", async ({ url, data }) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const deleteSingleECategoryCart = createAsyncThunk(
  "deleteSingleECategoryCart",
  async (url) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getAllEProduct = createAsyncThunk("getAllEProduct", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
const eHomeProduct = createSlice({
  name: "eHomeProduct",
  initialState: {
    HomeProduct: null,
    singleHomeProduct: null,
    AllProduct: null,
    Loading: false,
    IsLoading: false,
    createUpdateLoadin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEHomeProduct.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getEHomeProduct.fulfilled, (state, action) => {
        state.Loading = false;
        state.HomeProduct = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getEHomeProduct.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleEHomeProduct.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleEHomeProduct.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleHomeProduct = action.payload;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleEHomeProduct.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(getAllEProduct.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getAllEProduct.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.AllProduct = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getAllEProduct.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(updateSingleEHomeProduct.pending, (state, action) => {
        state.createUpdateLoadin = true;
      })
      .addCase(updateSingleEHomeProduct.fulfilled, (state, action) => {
        state.createUpdateLoadin = false;
      })
      .addCase(updateSingleEHomeProduct.rejected, (state, action) => {
        state.createUpdateLoadin = false;
      })
      .addCase(createEHomeProduct.pending, (state, action) => {
        state.createUpdateLoadin = true;
      })
      .addCase(createEHomeProduct.fulfilled, (state, action) => {
        state.createUpdateLoadin = false;
      })
      .addCase(createEHomeProduct.rejected, (state, action) => {
        state.createUpdateLoadin = false;
      });
  },
});
export default eHomeProduct.reducer;
