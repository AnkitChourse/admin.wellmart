import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllLinkableBanners = createAsyncThunk("getAllLinkableBanners", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleLinkableBanners = createAsyncThunk(
  "getSingleLinkableBanners",
  async (url) => {
    try {
      const res = await http.get(url);
      return res.data;
    } catch (error) {
      return { data: null };
    }
  }
);
export const getGlobalLinkableBanners = createAsyncThunk(
  "getGlobalLinkableBanners",
  async (url) => {
    try {
      const res = await http.get(url);
      return res.data;
    } catch (error) {
      return { data: null };
    }
  }
);

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

export const updateLinkableBanners = createAsyncThunk(
  "updateLinkableBanners",
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
export const deleteLinkableBanners = createAsyncThunk("deleteLinkableBanners", async ({ url }) => {
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
export const createLinkableBanners = createAsyncThunk(
  "createLInkableBanners",
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
const isLinkableSlice = createSlice({
  name: "isLinkableSlice",
  initialState: {
    linkableBanners: null,
    singleLinkableBanners: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllLinkableBanners.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllLinkableBanners.fulfilled, (state, action) => {
        state.Loading = false;
        state.linkableBanners = action.payload?.data;
      })
      .addCase(getGlobalLinkableBanners.fulfilled, (state, action) => {
        state.Loading = false;
        state.linkableBanners = action.payload?.data;
      })
      .addCase(getAllLinkableBanners.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleLinkableBanners.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleLinkableBanners.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleLinkableBanners = action.payload?.data;
      })
      .addCase(getSingleLinkableBanners.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default isLinkableSlice.reducer;
