import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialProfileStateData = {
  sideBarData: null,
  contentData: null,
};

const FetchUserConfig = async (id) => {
  try {
    const apiUrl = `${process.env.PUBLIC_URL}/UserConfig.json`;

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

const FetchSideBarData = async (jsonUrl) => {
  try {
    // const apiUrl = `${process.env.PUBLIC_URL}/SideBarData_${id}.json`;

    const response = await axios.get(jsonUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

const FetchContentData = async (jsonUrl) => {
  try {
    // const apiUrl = `${process.env.PUBLIC_URL}/ContentData_${id}.json`;

    const response = await axios.get(jsonUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

// Async thunk to load User Profile data
export const loadUserProfile = createAsyncThunk(
  "profile/load",
  async (_, { dispatch }) => {
    const queryParams = new URLSearchParams(window.location.search);
    let userId = queryParams.get("id");

    if (userId === null || userId === undefined) {
      toast.warn("User Profile Not Found. Please Check Id Value.");
      userId = 1;
    }

    console.log("userId", userId);

    const userConfig = await FetchUserConfig();
    let sideBarData = null;
    let contentData = null;

    console.log("userConfig", userConfig);

    if (userConfig !== null && userConfig !== undefined) {
      const userData = userConfig.Users.find((user) => user.name === userId);
      console.log("userData", userData);

      if (userData !== null && userData !== undefined) {
        sideBarData = await FetchSideBarData(userData.sidebarJson);
        console.log("sideBarData", sideBarData);
        contentData = await FetchContentData(userData.contentJson);
        console.log("contentData", contentData);
      }
    }

    // console.log(sideBarData);
    // console.log(contentData);

    if (sideBarData !== undefined && sideBarData !== null) {
      dispatch(
        ProfileDataActions.LoadSideBarConfig({ sideBarData: sideBarData })
      );
    } else {
      toast.error("Unable To Load SideBar Configuration.");
    }

    if (contentData !== undefined && contentData !== null) {
      dispatch(
        ProfileDataActions.LoadContentConfig({ contentData: contentData })
      );
    } else {
      toast.error("Unable To Load Body Content Configuration.");
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
