import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./profile.slice"; // Ensure correct path
import authReducer from "./auth.slice"; // Ensure correct path
import changeCssReducer from './cssChangedOn.slice'
export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    auth: authReducer,
    chageCss:changeCssReducer
  }
});
