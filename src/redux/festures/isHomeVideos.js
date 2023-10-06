import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllHomeVideos = createAsyncThunk("getAllHomeVideos", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleHomeVideos = createAsyncThunk("getSingleHomeVideos", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalHomeVideos = createAsyncThunk("getGlobalHomeVideos", async (url) => {
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

export const updateHomeVideos = createAsyncThunk("updateHomeVideos", async ({ url, data }) => {
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
export const deleteHomeVideos = createAsyncThunk("deleteHomeVideos", async ({ url }) => {
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
export const createHomeVideos = createAsyncThunk("createHomeVideos", async ({ url, data }) => {
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
const isHomeVideoSlice = createSlice({
  name: "isHomeVideoSlice",
  initialState: {
    homeVideos: null,
    singleHomeVideos: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllHomeVideos.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllHomeVideos.fulfilled, (state, action) => {
        state.Loading = false;
        state.homeVideos = action.payload?.data;
      })
      .addCase(getGlobalHomeVideos.fulfilled, (state, action) => {
        state.Loading = false;
        state.homeVideos = action.payload?.data;
      })
      .addCase(getAllHomeVideos.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleHomeVideos.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleHomeVideos.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleHomeVideos = action.payload?.data;
      })
      .addCase(getSingleHomeVideos.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default isHomeVideoSlice.reducer;
