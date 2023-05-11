import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadingSlice from "./loadingSlice.js";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    auth: authSlice,
  },
});
