import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getHomeProduct = createAsyncThunk("getHomeProduct", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleHomeProduct = createAsyncThunk("getSingleHomeProduct", async (data) => {
  try {
    // const res = await http.get(url);
    // return res.data;
    return data;
  } catch (error) {
    return { data: null };
  }
});

export const updateSingleHomeProduct = createAsyncThunk("updateSingleHomeProduct", async ({url,data}) => {
    try {
      const res = await axios.put(url,data ,{
        headers: {
          Authorization: localStorage.getItem("token"),
          // "Content-Type": "multipart/form-data",
        }});
  
      return res.data;
    } catch (error) {
      return { data: null };
    }
  });
  export const createHomeProduct = createAsyncThunk("createHomeProduct", async ({url,data}) => {
    try {
      const res = await axios.post(url,data ,{
        headers: {
          Authorization: localStorage.getItem("token"),
          // "Content-Type": "multipart/form-data",
        }});
  
      return res.data;
    } catch (error) {
      return { data: null };
    }
  });
  export const deleteHomeProduct = createAsyncThunk("deleteHomeProduct", async ( url ) => {
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
  });
  export const getAllHomeProduct = createAsyncThunk("getAllHomeProduct", async ( url ) => {
    try {
      const res = await http.get(url);
  
      return res.data;
    } catch (error) {
      return { data: null };
    }
  });
const HomeProduct = createSlice({
  name: "HomeProduct",
  initialState: {
    HomeProduct: null,
    singleHomeProduct: null,
    AllProduct: null,
    Loading: false,
    IsLoading: false,
    createUpdateLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeProduct.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getHomeProduct.fulfilled, (state, action) => {
        state.Loading = false;
        state.HomeProduct = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getHomeProduct.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleHomeProduct.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleHomeProduct.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleHomeProduct = action.payload
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleHomeProduct.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(getAllHomeProduct.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getAllHomeProduct.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.AllProduct = action.payload?.data
        // state.subCategoryData = action.payload;
      })
      .addCase(getAllHomeProduct.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(updateSingleHomeProduct.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateSingleHomeProduct.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateSingleHomeProduct.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createHomeProduct.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createHomeProduct.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createHomeProduct.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
  },
});
export default HomeProduct.reducer;
