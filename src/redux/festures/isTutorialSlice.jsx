import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllTutorials = createAsyncThunk("getAllTutorials", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleTutorialsById = createAsyncThunk("getSingleTutorialsById", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalTutorialsById = createAsyncThunk("getGlobalTutorialsById", async (url) => {
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

export const updateTutorials = createAsyncThunk("updateTutorials", async ({ url, data }) => {
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
export const deleteTutorials = createAsyncThunk("deleteTutorials", async ({ url }) => {
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
export const createTutorials = createAsyncThunk("createTutorials", async ({ url, data }) => {
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
const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState: {
    tutorials: null,
    singleTutorials: null,
    isPages: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTutorials.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllTutorials.fulfilled, (state, action) => {
        state.Loading = false;
        state.tutorials = action.payload?.data;
        state.isPages = action.payload?.totalPage;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalTutorialsById.fulfilled, (state, action) => {
        state.Loading = false;
        state.tutorials = action.payload?.data;
        state.isPages = action.payload?.totalPage;
        // console.log(action.payload?.data);
      })
      .addCase(getAllTutorials.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createTutorials.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createTutorials.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createTutorials.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleTutorialsById.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleTutorialsById.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleTutorials = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleTutorialsById.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
// export default tutorialSlice.reducer;
export default tutorialSlice.reducer;
