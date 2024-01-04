import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialProfileStateData = {
  sideBarData: null,
  contentData: null,
};

const FetchSideBarData = async (id) => {
  try {
    const apiUrl = `${process.env.PUBLIC_URL}/SideBarData${id}.json`;

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

const FetchContentData = async (id) => {
  try {
    const apiUrl = `${process.env.PUBLIC_URL}/ContentData${id}.json`;

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

// Async thunk to load User Profile data
export const loadUserProfile = createAsyncThunk(
  "profile/load",
  async (_, { dispatch }) => {
    const sideBarData = await FetchSideBarData(1);
    const contentData = await FetchContentData(1);

    // console.log(sideBarData);
    // console.log(contentData);

    if (sideBarData !== undefined && sideBarData !== null) {
      dispatch(
        ProfileDataActions.LoadSideBarConfig({ sideBarData: sideBarData })
      );
    } else {
      // Handle error
    }

    if (contentData !== undefined && contentData !== null) {
      dispatch(
        ProfileDataActions.LoadContentConfig({ contentData: contentData })
      );
    } else {
      // Handle error
    }
  }
);

const ProfileDataSlice = createSlice({
  name: "profile",
  initialState: initialProfileStateData,
  reducers: {
    LoadSideBarConfig(state, action) {
      state.sideBarData = action.payload.sideBarData;
    },
    LoadContentConfig(state, action) {
      state.contentData = action.payload.contentData;
    },
  },
});

export const ProfileDataActions = ProfileDataSlice.actions;

export default ProfileDataSlice;
