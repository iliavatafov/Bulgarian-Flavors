import { createSlice } from "@reduxjs/toolkit";
import ArticlesAPI from "../services/articles";

const initialModalState = {
  articles: {
    wineAndFood: [],
    nextDestination: [],
    tourismInitiatives: [],
    allArticles: [],
  },
  isAdmin: false,
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
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const updateAllArticles = () => async (dispatch) => {
  try {
    const articles = await ArticlesAPI.getAllArticles();

    dispatch(
      articleActions.setArticles({
        collection: "allArticles",
        data: articles,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteArticle = (section, articleId) => async () => {
  try {
    await ArticlesAPI.deleteArticle(section, articleId);
    await updateAllArticles();
  } catch (error) {
    console.error(error);
  }
};

export const articleActions = articlesSlice.actions;

export default articlesSlice.reducer;
