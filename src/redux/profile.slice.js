import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupState: false // Default state
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleState: (state, action) => {
      state.popupState = action.payload;
    }
  }
});

export const { toggleState } = toggleSlice.actions;
export const getShowState = (state) => state.toggle?.popupState || false;
export const getPopupState = (state) => state.toggle?.popupState || false;
export default toggleSlice.reducer;
