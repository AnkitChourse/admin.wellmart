import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getEHomeCategoryCart = createAsyncThunk("getEHomeCategoryCart", async (url) => {
  try {
    const res = await http.get(url);

    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleECategoryCart = createAsyncThunk("getSingleECategoryCart", async (data) => {
  try {
    // const res = await http.get(url);
    // return res.data;
    return data;
  } catch (error) {
    return { data: null };
  }
});

export const updateSingleECategoryCart = createAsyncThunk(
  "updateSingleECategoryCart",
  async ({ url, data }) => {
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
  }
);
export const createECategoryCart = createAsyncThunk(
  "createECategoryCart",
  async ({ url, data }) => {
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
  }
);
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
const eHomeCategoryCartSlice = createSlice({
  name: "eHomeCategorySlice",
  initialState: {
    EHomeCategory: null,
    singleEHomeCategory: null,
    createUpdateLoading: false,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEHomeCategoryCart.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getEHomeCategoryCart.fulfilled, (state, action) => {
        state.Loading = false;
        state.EHomeCategory = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getEHomeCategoryCart.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleECategoryCart.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleECategoryCart.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleEHomeCategory = action.payload;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleECategoryCart.rejected, (state, action) => {
        state.IsLoading = false;
      })
      .addCase(createECategoryCart.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createECategoryCart.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createECategoryCart.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateSingleECategoryCart.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateSingleECategoryCart.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateSingleECategoryCart.rejected, (state, action) => {
        state.createUpdateLoading = false;
      });
  },
});
export default eHomeCategoryCartSlice.reducer;
