import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearch: false,
    searchInput: "",
  },
  reducers: {
    toggleSearch(state) {
      state.isSearch = !state.isSearch;
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
