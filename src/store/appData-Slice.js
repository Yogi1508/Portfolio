import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
  name: "appData",
  initialState: {
    user: null,
    isMobileView: false,
  },
  reducers: {
    setMobileView: (state, action) => {
      state.isMobileView = true;
    },
    setDesktopView: (state, action) => {
      state.isMobileView = false;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const appDataActions = appDataSlice.actions;

export default appDataSlice;
