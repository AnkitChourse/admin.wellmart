import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllQuerys = createAsyncThunk("getAllQuerys", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleQueryById = createAsyncThunk("getSingleQueryById", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalQueryById = createAsyncThunk("getGlobalQueryById", async (url) => {
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

export const updateQuerys = createAsyncThunk("updateQuerys", async ({ url, data }) => {
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
export const deleteQuerys = createAsyncThunk("deleteQuerys", async ({ url }) => {
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
export const createQueryByShubham = createAsyncThunk(
  "createQueryByShubham",
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
const querySlice = createSlice({
  name: "querySlice",
  initialState: {
    query: null,
    singleQuery: null,
    // subCategoryData: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuerys.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllQuerys.fulfilled, (state, action) => {
        state.Loading = false;
        state.query = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalQueryById.fulfilled, (state, action) => {
        state.Loading = false;
        state.query = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getAllQuerys.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createQueryByShubham.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createQueryByShubham.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createQueryByShubham.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleQueryById.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleQueryById.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleQuery = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleQueryById.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
// export default tutorialSlice.reducer;
export default querySlice.reducer;
