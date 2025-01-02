import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useResize } from "../../../hooks/userResize";
import { useScroll } from "../../../hooks/useScroll";

import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import {
  DESKTOP_LOAD_POINT_OFFSET,
  DESKTOP_ARTICLE_ASPECT,
  EMPTY_STATE_TEXT,
  MOBILE_BREAKPOINT,
  MOBILE_LOAD_POINT_OFFSET,
  MOBILE_ARTICLE_ASPECT,
  PAGE_TITLES,
  PAGE_SIZE,
} from "../../../constants/articlesGrid";
import type {
  ArticleGridProps,
  ArticleItem,
  RootState,
} from "../../../types/articlesGridTypes";

import {
  filterArticles,
  handlePagination,
} from "../../../utils/articlesGridUtils";

import { GridHeader } from "./GridHeader";
import { ArticleCard } from "../ArticleCard/index";
import EmptyState from "../../EmptyState/EmptyState";

import styles from "./styles.module.css";

export const ArticleGrid: FC<ArticleGridProps> = ({ isLoading, section }) => {
  const [_page, setPage] = useState(1);
  const [articlesToRender, setArticlesToRender] = useState<ArticleItem[]>([]);
  const [searchArticles, setSearchArticles] = useState<ArticleItem[]>([]);

  const articles = useSelector((state: RootState) => state.articles.articles);
  const searchInput = useSelector(
    (state: RootState) => state.search.searchInput
  );

  const screenWidth = useResize();
  const isMobileView = useMemo(() => screenWidth <= 1200, [screenWidth]);

  const isHomePage = section === "allArticles";
  const isSearchView = window.location.href.includes("/search");

  const articleAspect = useMemo(
    () =>
      !isHomePage || isMobileView
        ? MOBILE_ARTICLE_ASPECT
        : DESKTOP_ARTICLE_ASPECT,
    [isHomePage, isMobileView]
  );

  useEffect(() => {
    const matchedArticles = filterArticles(
      articles,
      searchInput,
      section,
      isSearchView
    );
    setArticlesToRender(matchedArticles.slice(0, PAGE_SIZE));
    setSearchArticles(matchedArticles);
    setPage(1);
  }, [articles, searchInput, isHomePage, isMobileView, isSearchView]);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const loadPoint =
      scrollHeight -
      (window.innerWidth < MOBILE_BREAKPOINT
        ? MOBILE_LOAD_POINT_OFFSET
        : DESKTOP_LOAD_POINT_OFFSET);

    if (scrollTop + windowHeight >= loadPoint && !isLoading) {
      setPage((prevPage) =>
        handlePagination(
          prevPage,
          searchArticles,
          articles,
          section,
          setArticlesToRender
        )
      );
    }
  }, [isLoading, searchArticles, articles, section]);

  useScroll(handleScroll);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (articlesToRender.length === 0 && !isLoading && isSearchView) {
    return <EmptyState text={EMPTY_STATE_TEXT} />;
  }

  return (
    <div className={styles.container}>
      {articlesToRender.length > 0 && (
        <>
          <GridHeader title={PAGE_TITLES[section]} />
          <Grid
            container
            style={{ margin: 0, gap: "3rem" }}
            className={
              styles[`grid-container${articleAspect.mid ? "-mid" : ""}`]
            }
          >
            {articlesToRender.map((item) => (
              <Grid
                key={item.id}
                size={articleAspect}
                container
                alignItems="center"
                justifyContent="center"
              >
                <ArticleCard item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
