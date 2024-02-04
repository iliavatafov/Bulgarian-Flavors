import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  articles: {
    wineAndFood: [],
    nextDestination: [],
    tourismInitiatives: [],
    allArticles: [],
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialModalState,
  reducers: {
    setArticles(state, action) {
      const { collection, data } = action.payload;

      if (collection && data) {
        state.articles[collection] = data;
      }
    },
  },
});

export const articleActions = articlesSlice.actions;

export default articlesSlice.reducer;
