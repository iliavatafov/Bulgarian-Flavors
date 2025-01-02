import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import loadingSlice from "./loadingSlice.js.js";
import modalSlice from "./modalSlice.js";
import articlesSlice from "./articlesSlice.js";
import searchSlice from "./searchSlice.js";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    loading: loadingSlice,
    auth: authSlice,
    articles: articlesSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
