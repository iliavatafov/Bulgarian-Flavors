import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false },
  reducers: {
    toggle(state) {
      state.loading = !state.loading;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
