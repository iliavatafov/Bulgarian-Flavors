import { createSlice } from "@reduxjs/toolkit";
import ArticlesAPI from "../services/articles";
import { modalActions } from "./modalSlice";

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
