import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoverSidebar: false, // Default state
  closeImage:false,
  profile:false
};

const rtkCss = createSlice({
  name: "chageCss",
  initialState,
  reducers: {
    toggleHover: (state, action) => {
      state.hoverSidebar = action.payload;
    },
    setCloseImage: (state,action) =>{
      state.closeImage = action.payload
    },
    setProfile: (state,action) =>{
      state.profile = action.payload
    }
  }
});

export const { toggleHover,setCloseImage,setProfile } = rtkCss.actions;
export const getHoverState = (state) => state.chageCss?.hoverSidebar || false;
export const getImageState = (state) => state.chageCss?.closeImage || false;
export const getProfileState = (state) => state.chageCss?.profile || false;
export default rtkCss.reducer;
