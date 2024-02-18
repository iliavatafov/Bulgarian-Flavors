import { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import ArticlesAPI from "../../services/articles";
import { articleActions } from "../../store/articlesSlice";

import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import { firebaseAnalytics } from "../../firebase";

export const Destination = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const articles = await ArticlesAPI.getArticlesBySection(
        "next-destination"
      );
      dispatch(
        articleActions.setArticles({
          collection: "nextDestination",
          data: articles,
        })
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchArticles();
    firebaseAnalytics.logEvent("destination_page_visited");
  }, [fetchArticles]);

  return <ArticleGrid isLoading={isLoading} section={"nextDestination"} />;
};
