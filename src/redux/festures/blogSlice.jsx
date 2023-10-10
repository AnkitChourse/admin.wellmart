import axios from "axios";
import http from "Utils/api";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllBlogs = createAsyncThunk("getAllBlogs", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleBlog = createAsyncThunk("getSingleBlog", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalBlog = createAsyncThunk("getGlobalBlog", async (url) => {
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

export const updateBlog = createAsyncThunk("updateBlog", async ({ url, data }) => {
  // console.log(url, "url");
  // console.log(data, "data");
  // console.log(JSON.parses(data), "data");
  // console.log(...data, "...data");
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const deleteBlog = createAsyncThunk("deleteBlog", async ({ url }) => {
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
export const createPostBlogs = createAsyncThunk("createPostBlogs", async ({ url, data }) => {
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
const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blogs: null,
    singleBlogs: null,
    isPages: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.Loading = false;
        state.blogs = action.payload?.data;
        state.isPages = action.payload?.totalPage;
        // console.log(action.payload?.data);
      })
      .addCase(getGlobalBlog.fulfilled, (state, action) => {
        state.blogs = action.payload?.data;
        state.isPages = action.payload?.totalPage;
        // console.log(action.payload?.data);
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(createPostBlogs.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(createPostBlogs.fulfilled, (state, action) => {
        state.Loading = false;
        // state.category = action.payload?.data;
      })
      .addCase(createPostBlogs.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleBlog.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.Loading = false;
        state.singleBlogs = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default blogSlice.reducer;
