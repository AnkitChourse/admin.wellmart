import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getHomeCategoryCart = createAsyncThunk("getHomeCategoryCart", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleCategoryCart = createAsyncThunk("getSingleCategoryCart", async (data) => {
  try {
    // const res = await http.get(url);
    // return res.data;
    return data;
  } catch (error) {
    return { data: null };
  }
});

export const updateSingleCategoryCart = createAsyncThunk("updateSingleCategoryCart", async ({url,data}) => {
    try {
      const res = await axios.put(url,data ,{
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        }});
  
      return res.data;
    } catch (error) {
      return { data: null };
    }
  });
  export const createCategoryCart = createAsyncThunk("createCategoryCart", async ({url,data}) => {
    try {
      const res = await axios.post(url,data ,{
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        }});
  
      return res.data;
    } catch (error) {
      return { data: null };
    }
  });
  export const deleteSingleCategoryCart = createAsyncThunk("deleteSingleCategoryCart", async ( url ) => {
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
const homeCategoryCartSlice = createSlice({
  name: "homeCategorySlice",
  initialState: {
    homeCategory: null,
    singlehomeCategory: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
    createUpdateLoading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeCategoryCart.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getHomeCategoryCart.fulfilled, (state, action) => {
        state.Loading = false;
        state.homeCategory = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getHomeCategoryCart.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleCategoryCart.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleCategoryCart.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singlehomeCategory = action.payload
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleCategoryCart.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(updateSingleCategoryCart.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateSingleCategoryCart.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateSingleCategoryCart.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createCategoryCart.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createCategoryCart.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createCategoryCart.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
  },
});
export default homeCategoryCartSlice.reducer;
