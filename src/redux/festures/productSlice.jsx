import axios from "axios";
import http from "Utils/api2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getProductsWithoutLoading = createAsyncThunk("getProductsWithoutLoading", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getAllGlobalProducts = createAsyncThunk("getAllGlobalProducts", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleProduct = createAsyncThunk("getSingleProduct", async (data) => {
  try {
    // const res = await http.get(url);
    return { data };
  } catch (error) {
    return { data: null };
  }
});
export const updateProducts = createAsyncThunk("updateProducts", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: localStorage.getItem("token") },
    body: data,
  });
  return await res.json();
});
export const createProduct = createAsyncThunk("createProduct", async ({ url, data }) => {
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
export const updateProduct = createAsyncThunk("updateProduct", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(data, "data");
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await http.put(url, data, {
      headers: {
        "Content-Type": "multipart/form",
        Authorization: localStorage.getItem("token")
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const updateProductPic = createAsyncThunk("updateProductPic", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(data, "data");
  const isData = data;
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await http.put(url, isData, {
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
export const createProducts = createAsyncThunk("createProducts", async ({ url, data }) => {
  // const response = await axios({
  //   method: "post",
  //   url: url,
  //   headers: {
  //     // "Content-Type": "multipart/form-data",
  //     // Accept: "application/json",
  //     authorization: `${localStorage.getItem("token")}`,
  //   },
  //   data: data,
  // })
  //   .then((response) => response)
  //   .catch((error) => error.response);

  // return response.data;
  const res = await http.post(url, data, {
    headers: {
      "Content-Type": "multipart/form",
      Authorization: localStorage.getItem("token")
    },
  });
  return res.data
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    Loading: false,
    AllProducts: null,
    page: null,
    singleProduct: null,
    createUpdateLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGlobalProducts.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllGlobalProducts.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllProducts = action.payload?.data;
        state.page = action.payload?.page;
      })
      .addCase(getProductsWithoutLoading.fulfilled, (state, action) => {
        state.AllProducts = action.payload?.data;
        state.page = action.payload?.page;
      })
      .addCase(getAllGlobalProducts.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createProducts.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
        // state.AllProducts = action.payload?.data;
        // state.page = action.payload?.page;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
        // state.AllProducts = action.payload?.data;
        // state.page = action.payload?.page;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(getSingleProduct.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleProduct = action.payload?.data;
        // state.page = action.payload?.page;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default productSlice.reducer;