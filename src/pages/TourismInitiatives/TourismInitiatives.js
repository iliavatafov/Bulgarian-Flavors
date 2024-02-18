import { useCallback, useEffect, useState } from "react";
import { firebaseAnalytics } from "../../firebase";

import { useDispatch } from "react-redux";
import { articleActions } from "../../store/articlesSlice";
import { ArticleGrid } from "../../components/Articles/ArticlesGrid";

import ArticlesAPI from "../../services/articles";

export const TourismInitiatives = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const articles = await ArticlesAPI.getArticlesBySection(
        "tourism-initiatives"
      );
      dispatch(
        articleActions.setArticles({
          collection: "tourismInitiatives",
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
    firebaseAnalytics.logEvent("tourism_iniciatives_page_visited");
  }, []);

  return <ArticleGrid isLoading={isLoading} section={"tourismInitiatives"} />;
};
