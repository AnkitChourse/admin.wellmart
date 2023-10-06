import http from "Utils/api2";
import { handleAlert } from "./alertSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAdminDetails = createAsyncThunk("getAdminDetails", async (url) => {
  try {
    const res = await http.get(url);
    // console.log(res.data,"console.log(res.data)")
    return res.data;
  } catch (error) {
    return { data: null };
  }
});
export const getDashboardDetails = createAsyncThunk("getDashboardDetails", async (url) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

export const adminLoginApi = createAsyncThunk(
  "adminLoginApi",
  async ({ url, data, navigate }, { dispatch }) => {
    // console.log(url, data);
    try {
      const res = await http
        .post(url, data)
        .then((result) => {


          if (result?.data?.data?.userType?.includes("SUPER_ADMIN") || result?.data?.data?.userType?.includes("SUB_ADMIN") || result?.data?.data?.userType?.includes("ADMIN"))
            return result;
          else throw "You Are Not Admin And Hence Not Authorized To Access This Panel";
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            handleAlert({
              isOpen: true,
              type: `${"error"}`,
              msg: err?.response?.data?.message,
            })
          );
        });
      // console.log(res, "data");
      if (res) {
        dispatch(
          handleAlert({
            isOpen: true,
            type: `${res.data.success ? "success" : "error"}`,
            msg: res.data.message,
          })
        );
        navigate("/dashboard");
        localStorage.setItem("token", res?.data?.data?.token);
        localStorage.setItem("admin_id", res.data?.data?._id);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateAdminProfile = createAsyncThunk("updateAdminProfile", async ({ url, data }) => {
  // console.log(url, data);
  // console.log(JSON.stringify(data));

  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: localStorage.getItem("token") },
    body: data,
  });
  return await res.json();
});
const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    isAdmin: null,
    admin: null,
    Loading: false,
    isDashboard: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginApi.pending, (state, action) => {
        state.Loading = true;

      })
      .addCase(adminLoginApi.fulfilled, (state, action) => {
        state.Loading = false;
        state.admin = action?.payload || null;
        state.isAdmin = action?.payload?.data || null

      })
      .addCase(adminLoginApi.rejected, (state, action) => {
        state.Loading = false;
      })
      .addCase(getDashboardDetails.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getDashboardDetails.fulfilled, (state, action) => {
        state.Loading = false;
        state.isDashboard = action.payload;
      })
      .addCase(getDashboardDetails.rejected, (state, action) => {
        state.Loading = false;
      })

      .addCase(getAdminDetails.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(getAdminDetails.fulfilled, (state, action) => {
        state.Loading = false;
        state.isAdmin = action.payload?.data;
        // console.log(action.payload?.data,"hfhfhffhf")
      })
      .addCase(getAdminDetails.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default adminSlice.reducer;
