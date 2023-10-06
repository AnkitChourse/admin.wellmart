import http from "Utils/api2";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const skCompany = createAsyncThunk("skCompany", async ({ url }) => {
  try {
    const res = await http.get(url);
    return res.data;
  } catch (error) {
    return { data: null };
  }
});

// export const isUpdateCompany = async () => {
//   // console.log(url);
//   // console.log(data);
//   // console.log(content);
//   const formData = new FormData();
//   formData.append(content, data);
//   // console.log(...formData);
//   try {
//     const response = await axios.put(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//     console.log(response?.data);
//     if (response?.data?.data?.payload?.success) {
//       dispatch(skCompany({ url: "get/company" }));
//     }
//     dispatch(
//       handleAlert({
//         isOpen: true,
//         type: "success",
//         msg: response.data?.data?.payload?.message,
//       })
//     );
//   } catch (error) {
//     dispatch(
//       handleAlert({
//         isOpen: true,
//         type: "error",
//         msg: error.response.data?.data?.payload?.message,
//       })
//     );
//     console.log(error?.response?.data);
//   }
// };

const isCompany = createSlice({
  name: "isCompany",
  initialState: {
    Loading: false,
    companyData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(skCompany.pending, (state, action) => {
        state.Loading = true;
      })
      .addCase(skCompany.fulfilled, (state, action) => {
        state.Loading = false;
        state.companyData = action.payload?.data;
      })
      .addCase(skCompany.rejected, (state, action) => {
        state.Loading = false;
      });
  },
});
export default isCompany.reducer;
