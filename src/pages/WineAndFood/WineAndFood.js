import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { articleActions } from "../../store/articlesSlice";
import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import { firebaseAnalytics } from "../../firebase";

import ArticlesAPI from "../../services/articles";

export const WineAndFood = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const articles = await ArticlesAPI.getArticlesBySection("wine-and-food");
      dispatch(
        articleActions.setArticles({
          collection: "wineAndFood",
          data: articles,
        })
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchArticles();
    firebaseAnalytics.logEvent("wine_and_food_page_visited");
  }, []);

  return <ArticleGrid isLoading={isLoading} section={"wineAndFood"} />;
};
