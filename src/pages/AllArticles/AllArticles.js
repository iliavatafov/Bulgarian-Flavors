import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { articleActions } from "../../store/articlesSlice";
import { loadingActions } from "../../store/loadingSlice.js";

import ArticlesAPI from "../../services/articles";

import { ArticleGrid } from "../../components/Articles/ArticlesGrid";

export const AllArticles = () => {
  const allArticles = useSelector(
    (state) => state.articles.articles.allArticles
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        dispatch(loadingActions.setLoadingTrue());
        const articles = await ArticlesAPI.getAllArticles();

        dispatch(
          articleActions.setArticles({
            collection: "allArticles",
            data: articles,
          })
        );
      } catch (error) {
      } finally {
        dispatch(loadingActions.setLoadingFalse());
      }
    };

    if (!allArticles.length) {
      fetchArticles();
    }
  }, []);

  return <ArticleGrid section={"allArticles"} />;
};
