import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllExtraSections = createAsyncThunk("getAllExtraSections", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res, "rssssssssss");
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleExtraSections = createAsyncThunk("getSingleExtraSections", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalExtraSections = createAsyncThunk("getGlobalExtraSections", async (url) => {
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

export const updateExtraSections = createAsyncThunk(
  "updateExtraSections",
  async ({ url, data }) => {
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
  }
);
export const deleteExtraSections = createAsyncThunk("deleteExtraSections", async ({ url }) => {
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
export const createExtraSections = createAsyncThunk(
  "createExtraSections",
  async ({ url, data }) => {
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
  }
);
const isExtraSectionSlice = createSlice({
  name: "isExtraSectionSlice",
  initialState: {
    extraSections: null,
    singleExtraSections: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllExtraSections.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllExtraSections.fulfilled, (state, action) => {
        state.Loading = false;
        if (action.payload) {
          state.extraSections = action.payload.data;
        } else {
          state.extraSections = null; // or assign any other appropriate value
        }
      })
      .addCase(getGlobalExtraSections.fulfilled, (state, action) => {
        state.Loading = false;
        if (action.payload) {
          state.extraSections = action.payload.data;
        } else {
          state.extraSections = null; // or assign any other appropriate value
        }
      })
      .addCase(getAllExtraSections.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleExtraSections.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleExtraSections.fulfilled, (state, action) => {
        state.Loading = false;
        if (action.payload) {
          state.singleExtraSections = action.payload.data;
        } else {
          state.extraSections = null; // or assign any other appropriate value
        }
      })
      .addCase(getSingleExtraSections.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default isExtraSectionSlice.reducer;
