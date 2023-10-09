import axios from "axios";
import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAllOrders = createAsyncThunk("getAllOrders", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getSingleOrders = createAsyncThunk("getSingleOrders", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getGlobalOrders = createAsyncThunk("getGlobalOrders", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const updateOrderDetails = createAsyncThunk("updateOrderDetails", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  try {
    const response = await http.put(url, data);

    return response.data;
  } catch (error) {
    return error.response.data;
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

// export const updateAttribute = createAsyncThunk("updateAttribute", async ({ url, data }) => {
//   // console.log(url, data);
//   // console.log(JSON.stringify(data));

//   const res = await fetch(url, {
//     method: "PUT",
//     headers: { Authorization: localStorage.getItem("token") },
//     body: data,
//   });
//   return await res.json();
// });
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
const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    ServiceOrderStats: null,
    EcommOrderStats: null,
    AllOrders: null,
    singleOrders: null,
    isPages: null,
    Loading: false,
    IsLoading: false,
    isNewOrderId: null,
    isModalStatus: false,
  },
  reducers: {
    handleOrderId: (state, action) => {
      state.isNewOrderId = action.payload.isNewOrderId;
    },
    handleModalStatus: (state, action) => {
      state.isModalStatus = action.payload.isModalStatus;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllOrders = action.payload?.filterData;
        state.isPages = action.payload?.page;
      })
      .addCase(getGlobalOrders.fulfilled, (state, action) => {
        state.Loading = false;
        state.AllOrders = action.payload?.data;
        state.isPages = action.payload?.totalPage;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getSingleOrders.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getSingleOrders.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.singleOrders = action.payload?.data;
        // state.subCategoryData = action.payload;
      })
      .addCase(getSingleOrders.rejected, (state, action) => {
        state.IsLoading = false;
      });
  },
});
export const { handleModalStatus, handleOrderId } = orderSlice.actions;
export default orderSlice.reducer;
