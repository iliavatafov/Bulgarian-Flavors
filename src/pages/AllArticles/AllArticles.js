import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { firebaseAnalytics } from "../../firebase.js";

import { CircularProgress } from "@mui/material";

import { articleActions } from "../../store/articlesSlice";

import ArticlesAPI from "../../services/articles";

import EmptyState from "../../components/EmptyState/EmptyState";
import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import { GridHeader } from "../../components/Articles/ArticlesGrid/GridHeader";
import { CarouselComponent } from "../../components/Carousel/Carousel";

import styles from "./AllArticles.module.css";

export const AllArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const allArticles = useSelector(
    (state) => state.articles.articles.allArticles
  );

  const location = useLocation();
  const dispatch = useDispatch();
  const isSearchView = location.pathname === "/search";

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);

      const articles = await ArticlesAPI.getAllArticles();
      dispatch(
        articleActions.setArticles({
          collection: "allArticles",
          data: articles,
        })
      );

      setIsLoading(false);
    };

    fetchArticles();

    firebaseAnalytics.logEvent("home_page_visited");
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      )}
      {!!allArticles.length && !isLoading && (
        <>
          {!isSearchView && (
            <>
              <div className={styles.header}>
                <GridHeader title={"Най-четени"} />
              </div>
              <CarouselComponent articles={allArticles.slice(0, 5)} />
            </>
          )}
          <ArticleGrid section={"allArticles"} />
        </>
      )}
      {!allArticles.length && !isLoading && (
        <EmptyState text="Възникна грешка. Моля опитайте по-късно." />
      )}
    </div>
  );
};
