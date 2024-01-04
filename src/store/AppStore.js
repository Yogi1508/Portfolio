import { configureStore } from "@reduxjs/toolkit";
import appDataSlice from "./appData-Slice";
import ProfileDataSlice from "./profile-Slice";

const appStore = configureStore({
  reducer: {
    appData: appDataSlice.reducer,
    profileData: ProfileDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default appStore;
