import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getCategory = createAsyncThunk("getCategory", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getEcomCategory = createAsyncThunk("getEcomCategory", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSubCategory = createAsyncThunk("getSubCategory", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSubGlobalCategory = createAsyncThunk("getSubGlobalCategory", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalCategory = createAsyncThunk("getGlobalCategory", async (url) => {
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

export const updateCategory = createAsyncThunk("updateCategory", async ({ url, data, notFormData }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await http.put(url, data, {
    headers: {
      'Content-Type': notFormData ? 'application/json' : 'multipart/form'
    }
  });
  return res.data
});

export const unlinkImage = createAsyncThunk("unlinkImage", async ({ url, data, notFormData }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await http.put(url, data, {
    headers: {
      'Content-Type': notFormData ? 'application/json' : 'multipart/form'
    }
  });
  return res.data
});



export const deleteCategory = createAsyncThunk("deleteCategory", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: localStorage.getItem("token") },
    body: JSON.stringify(data),
  });
  return await res.json();
});

export const creatCategoryData = createAsyncThunk("creatCategoryData", async ({ url, reqBody }) => {
  const response = await http.post(url, reqBody, {
    headers: { 'Content-Type': 'multipart/form' }
  })
    .then((response) => response)
    .catch((error) => error.response);

  return response.data;
});
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    category: null,
    EcomCategory:null,
    subCategory: null,
    subCategoryData: null,
    Loading: false,
    createUpdateLoading: false,
    IsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.Loading = false;
        state.category = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getEcomCategory.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getEcomCategory.fulfilled, (state, action) => {
        state.Loading = false;
        state.EcomCategory = action.payload?.data;
        // console.log(action.payload?.data,"redux");
      })
      .addCase(getEcomCategory.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getGlobalCategory.fulfilled, (state, action) => {
        state.Loading = false;
        state.category = action.payload?.data;
        // console.log(action.payload?.data);
      })
      
      .addCase(creatCategoryData.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(creatCategoryData.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
        // state.category = action.payload?.data;
      })
      .addCase(creatCategoryData.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
        // state.category = action.payload?.data;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(getSubCategory.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSubCategory.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.subCategory = action.payload?.data;
        state.subCategoryData = action.payload;
      })
      .addCase(getSubGlobalCategory.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.subCategory = action.payload?.data;
        state.subCategoryData = action.payload;
      })
      .addCase(getSubCategory.rejected, (state, action) => {
        state.IsLoading = false;
      });
  },
});
export default categorySlice.reducer;
