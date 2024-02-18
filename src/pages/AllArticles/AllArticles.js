import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Carousel from "react-material-ui-carousel";
import { CircularProgress, Paper } from "@mui/material";

import { articleActions } from "../../store/articlesSlice";
import { loadingActions } from "../../store/loadingSlice.js";

import ArticlesAPI from "../../services/articles";

import { ArticleGrid } from "../../components/Articles/ArticlesGrid";
import { firebaseAnalytics } from "../../firebase.js";
import { CarouselCard } from "../../components/CarouselCard/CarouselCard.js";
import { GridHeader } from "../../components/Articles/GridHeader.js";

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
      try {
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

    firebaseAnalytics.logEvent("home_page_visited");
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setCarouselReady(true);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

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
                <Carousel
                  animation="slide"
                  autoPlay={true}
                  stopAutoPlayOnHover={true}
                  swipe
                  timeout={500}
                  navButtonsProps={{
                    style: {
                      backgroundColor: "transparent",
                      color: "#00d49a",
                      borderRadius: 0,
                    },
                  }}
                  className={styles["carousel-wrapper"]}
                >
                  {allArticles.slice(0, 5).map((item) => (
                    <Paper
                      key={item.id}
                      sx={{
                        p: 2,
                        backgroundColor: "rgb(240 242 245)",
                        borderRadius: "0",
                        width: "100%",
                        border: "none",
                        boxShadow: "none",
                      }}
                      className={styles.paper}
                    >
                      <CarouselCard item={item} />
                    </Paper>
                  ))}
                </Carousel>
              )}
            </>
          )}
          <ArticleGrid section={"allArticles"} />
        </>
      )}
    </div>
  );
};
