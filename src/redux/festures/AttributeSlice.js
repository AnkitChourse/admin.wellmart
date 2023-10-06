import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAttribute = createAsyncThunk("getAttribute", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getIsAttribute = createAsyncThunk("getIsAttribute", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleAttribute = createAsyncThunk("getSingleAttribute", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalAttribute = createAsyncThunk("getGlobalAttribute", async (url) => {
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

export const updateAttribute = createAsyncThunk("updateAttribute", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));
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
export const deleteAttribute = createAsyncThunk("deleteAttribute", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await fetch(url, {
    method: "DELETE",
    headers: { Authorization: localStorage.getItem("token") },
    body: JSON.stringify(data),
  });
  return await res.json();
});

export const createAttributeData = createAsyncThunk(
  "createAttributeData",
  async ({ url, data }) => {
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: data,
    })
      .then((response) => response)
      .catch((error) => error.response);

    return response.data;
  }
);
const attributeSlice = createSlice({
  name: "attributeSlice",
  initialState: {
    attribute: null,
    isAttribute: null,
    singleAttribute: null,
    // subCategoryData: null,
    Loading: false,
    IsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttribute.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAttribute.fulfilled, (state, action) => {
        state.Loading = false;
        state.attribute = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalAttribute.fulfilled, (state, action) => {
        state.Loading = false;
        state.attribute = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAttribute.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createAttributeData.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createAttributeData.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createAttributeData.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getIsAttribute.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getIsAttribute.fulfilled, (state, action) => {
        state.Loading = false;
        state.isAttribute = action.payload?.data;
      })
      .addCase(getIsAttribute.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleAttribute.pending, (state, action) => {
        state.IsLoading = true;
      })
      .addCase(getSingleAttribute.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleAttribute = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleAttribute.rejected, (state, action) => {
        state.IsLoading = false;
      });
  },
});
export default attributeSlice.reducer;
