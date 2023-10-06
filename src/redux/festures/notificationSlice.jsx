import http from "Utils/api";
// import http from "Utils/api2";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllNotification = createAsyncThunk("getAllNotification", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleNotification = createAsyncThunk("getSingleNotification", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

export const getNotificationCount = createAsyncThunk("getNotificationCount", async (url) => {
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

export const UpdateNotification = createAsyncThunk("UpdateNotification", async ({ url, data }) => {
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
export const deleteNotification = createAsyncThunk("deleteNotification", async ({ url }) => {
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
const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    notification: null,
    singleNotification: null,
    isCount: null,
    isSetLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotification.pending, (state, action) => {
        state.isSetLoading = true;
      })
      .addCase(getAllNotification.fulfilled, (state, action) => {
        state.isSetLoading = false;
        state.notification = action.payload?.data;

        // console.log(action.payload?.data);
      })
      .addCase(getAllNotification.rejected, (state, action) => {
        state.isSetLoading = false;
      })
      .addCase(getSingleNotification.pending, (state, action) => {
        state.isSetLoading = true;
      })
      .addCase(getSingleNotification.fulfilled, (state, action) => {
        state.isSetLoading = false;
        state.singleNotification = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleNotification.rejected, (state, action) => {
        state.isSetLoading = false;
      })
      .addCase(getNotificationCount.pending, (state, action) => {
        state.isSetLoading = true;
      })
      .addCase(getNotificationCount.fulfilled, (state, action) => {
        state.isSetLoading = false;
        state.isCount = action.payload?.count;
        // state.subCategoryData = action.payload;
      })
      .addCase(getNotificationCount.rejected, (state, action) => {
        state.isSetLoading = false;
      })
      .addCase(deleteNotification.pending, (state, action) => {
        state.isSetLoading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isSetLoading = false;
        // state.singleBrands = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isSetLoading = false;
      });
  },
});
// export default tutorialSlice.reducer;
export default notificationSlice.reducer;
