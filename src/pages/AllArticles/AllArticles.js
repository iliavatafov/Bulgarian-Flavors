import { useDispatch, useSelector } from "react-redux";
import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import ArticlesAPI from "../../services/articles";
import { articleActions } from "../../store/articlesSlice";
import { useEffect } from "react";
import { loadingActions } from "../../store/loadingSlice.js";

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
