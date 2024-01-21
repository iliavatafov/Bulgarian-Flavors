import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadingSlice from "./loadingSlice.js";
import modalSlice from "./modalSlice";
import articlesSlice from "./articlesSlice.js";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    auth: authSlice,
    articles: articlesSlice,
  },
});
