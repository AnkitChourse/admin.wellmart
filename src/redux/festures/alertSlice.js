import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: {
      isOpen: false,
      type: "success",
      msg: "i am shubham",
    },
    FcmToken:null,

  },
  reducers: {
    handleAlert: (state, action) => {
      // if (state.alerts.isOpen == false) {
      //   state.alerts = action.payload;
      // }
      // console.log(action.payload, 'slice')
      state.alerts = action.payload;
    },
        handletoken: (state, action) => {
        state.FcmToken = action.payload;
        // console.log(action.payload, "redux");
      },
  },
});
export const { handleAlert,handletoken } = alertSlice.actions;
export default alertSlice.reducer;
