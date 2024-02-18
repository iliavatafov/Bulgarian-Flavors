import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";

import { articleActions } from "../../store/articlesSlice";
import { loadingActions } from "../../store/loadingSlice.js";

import ArticlesAPI from "../../services/articles";

import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import { firebaseAnalytics } from "../../firebase.js";
import { GridHeader } from "../../components/Articles/GridHeader.js";
import { CarouselComponent } from "../../components/Carousel/Carousel.js";

import styles from "./AllArticles.module.css";

export const AllArticles = () => {
  const [isCarouselReady, setCarouselReady] = useState(false);
  const allArticles = useSelector(
    (state) => state.articles.articles.allArticles
  );

  const location = useLocation();
  const dispatch = useDispatch();
  const isSearchView = location.pathname === "/search";

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(loadingActions.setLoadingTrue());

      const articles = await ArticlesAPI.getAllArticles();

      dispatch(
        articleActions.setArticles({
          collection: "allArticles",
          data: articles,
        })
      );

      dispatch(loadingActions.setLoadingFalse());
    };

    if (!allArticles.length) {
      fetchArticles();
    }

    firebaseAnalytics.logEvent("home_page_visited");
  }, []);

  useEffect(() => {
    const delay = setImmediate(() => {
      setCarouselReady(true);
    });

    return () => clearTimeout(delay);
  }, []);

  const MemorizedCarousel = React.memo(({ articles }) => {
    return <CarouselComponent articles={articles} />;
  });

  return (
    <div className={styles.wrapper}>
      {allArticles.length && (
        <>
          {!isSearchView && (
            <>
              <div className={styles.header}>
                <GridHeader title={"Най-четени"} />
              </div>
              {!isCarouselReady && (
                <div className={styles.loader}>
                  <CircularProgress
                    sx={{
                      alignSelf: "center",
                    }}
                  />
                </div>
              )}
              {isCarouselReady && (
                <MemorizedCarousel articles={allArticles.slice(0, 5)} />
              )}
            </>
          )}
          <ArticleGrid section={"allArticles"} />
        </>
      )}
    </div>
  );
};
