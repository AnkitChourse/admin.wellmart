import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllUsers = createAsyncThunk("getAllUsers", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleUser = createAsyncThunk("getSingleUser", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

export const getAllTransaction = createAsyncThunk("getAllTransaction", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleTransaction = createAsyncThunk("getSingleTransaction", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getAllGlobalUsers = createAsyncThunk("getAllGlobalUsers", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const createAdmin = createAsyncThunk("createAdmin", async ({ url, data }) => {
  try {
    const res = await http.post(url, data);
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

export const updateUser = createAsyncThunk("updateAttribute", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await fetch(url, {
    method: "PUT",
    headers: { authorization: localStorage.getItem("token") },
    body: data,
  });
  return await res.json();
});
export const updateAdmin = createAsyncThunk("updateAdmin", async ({ url, data }) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
// export const deleteAttribute = createAsyncThunk("deleteAttribute", async ({ url, data }) => {
//   // console.log(url, data);
//   // console.log(JSON.stringify(data));

//   const res = await fetch(url, {
//     method: "DELETE",
//     headers: { Authorization: localStorage.getItem("token") },
//     body: JSON.stringify(data),
//   });
//   return await res.json();
// });

// export const createAttributeData = createAsyncThunk(
//   "createAttributeData",
//   async ({ url, reqBody }) => {
//     const response = await axios({
//       method: "post",
//       url: url,
//       headers: {
//         // "Content-Type": "application/json",
//         // Accept: "application/json",
//         Authorization: localStorage.getItem("token"),
//       },
//       data: reqBody,
//     })
//       .then((response) => response)
//       .catch((error) => error.response);

//     return response.data;
//   }
// );

export const createNotification = createAsyncThunk("createNotification", async ({ url, data }) => {
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
const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    AllUsers: null,
    singleUsers: null,
    isPages: null,
    // subCategoryData: null,
    Loading: false,
    isLoading: false,
    allTransaction: null,
    singleTransaction: null,
    createUpdateLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllUsers = action.payload?.data;
        state.isPages = action.payload?.page;
      })
      .addCase(getAllGlobalUsers.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllUsers = action.payload?.data;
        state.isPages = action.payload?.page;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getAllTransaction.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.Loading = false;
        state.allTransaction = action.payload?.data?.items;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUsers = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getSingleTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleTransaction = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleTransaction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSingleTransaction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateAdmin.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createAdmin.pending, (state, action) => {
        state.createUpdateLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.createUpdateLoading = false;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.createUpdateLoading = false;
      })
  },
});
export default usersSlice.reducer;
