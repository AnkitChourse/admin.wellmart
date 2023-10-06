import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getIsHomesData = createAsyncThunk("getIsHomesData", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

export const getIsHomeById = createAsyncThunk("getIsHomeById", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getIsHomeGlobal = createAsyncThunk("getIsHomeGlobal", async (url) => {
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

export const updateIsHome = createAsyncThunk("updateIsHome", async ({ url, data }) => {
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
export const deleteIsHome = createAsyncThunk("deleteIsHome", async ({ url }) => {
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
export const createIsHomes = createAsyncThunk("createIsHomes", async ({ url, data }) => {
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
const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    homeData: null,
    singleHome: null,

    // subCategoryData: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIsHomesData.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getIsHomesData.fulfilled, (state, action) => {
        state.Loading = false;
        state.homeData = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getIsHomeGlobal.fulfilled, (state, action) => {
        state.Loading = false;
        state.homeData = action.payload?.data;
        // console.log(action.payload?.data);
      })
      .addCase(getIsHomesData.rejected, (state, action) => {
        state.Loading = false;
      })
      // .addCase(getHomeVideos.pending, (state, action) => {
      //   state.Loading = true;
      // })
      // .addCase(getHomeVideos.fulfilled, (state, action) => {
      //   state.Loading = false;
      //   state.homeVideos = action.payload?.data;
      //   // console.log(action.payload?.data);
      // })
      // .addCase(getHomeVideos.rejected, (state, action) => {
      //   state.Loading = false;
      // })
      // .addCase(getSingleHomeVideos.pending, (state, action) => {
      //   state.Loading = true;
      // })
      // .addCase(getSingleHomeVideos.fulfilled, (state, action) => {
      //   state.Loading = false;
      //   state.singleHomeVideos = action.payload?.data;
      //   // console.log(action.payload?.data);
      // })
      // .addCase(getSingleHomeVideos.rejected, (state, action) => {
      //   state.Loading = false;
      // })
      // .addCase(getHomeLinkableBanners.pending, (state, action) => {
      //   state.Loading = true;
      // })
      // .addCase(getHomeLinkableBanners.fulfilled, (state, action) => {
      //   state.Loading = false;
      //   state.linkableBanners = action.payload?.data;
      //   // console.log(action.payload?.data);
      // })
      // .addCase(getHomeLinkableBanners.rejected, (state, action) => {
      //   state.Loading = false;
      // })
      // .addCase(getHomeSingleExtraSections.pending, (state, action) => {
      //   state.Loading = true;
      // })
      // .addCase(getHomeSingleExtraSections.fulfilled, (state, action) => {
      //   state.Loading = false;
      //   state.singleExtraSections = action.payload?.data;
      //   // console.log(action.payload?.data);
      // })
      // .addCase(getHomeSingleExtraSections.rejected, (state, action) => {
      //   state.Loading = false;
      // })
      // .addCase(getHomeExtraSections.pending, (state, action) => {
      //   state.Loading = true;
      // })
      // .addCase(getHomeExtraSections.fulfilled, (state, action) => {
      //   state.Loading = false;
      //   state.extraSections = action.payload?.data;
      //   // console.log(action.payload?.data);
      // })
      // .addCase(getHomeExtraSections.rejected, (state, action) => {
      //   state.Loading = false;
      // })
      .addCase(createIsHomes.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createIsHomes.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createIsHomes.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getIsHomeById.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getIsHomeById.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleHome = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getIsHomeById.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default homeSlice.reducer;
