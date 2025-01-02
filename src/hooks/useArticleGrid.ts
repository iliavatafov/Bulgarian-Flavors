import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useResize } from "./useResize";
import { useScroll } from "./useScroll";

import { filterArticles, handlePagination } from "../utils/articlesGridUtils";

import {
  DESKTOP_LOAD_POINT_OFFSET,
  MOBILE_BREAKPOINT,
  MOBILE_LOAD_POINT_OFFSET,
  PAGE_SIZE,
} from "../constants/articlesGrid";
import type { ArticleItem, RootState } from "../types/articlesGridTypes";

export const useArticleGrid = (section: string, isLoading: boolean) => {
  const [_page, setPage] = useState(1);
  const [articlesToRender, setArticlesToRender] = useState<ArticleItem[]>([]);
  const [searchArticles, setSearchArticles] = useState<ArticleItem[]>([]);

  const articles = useSelector((state: RootState) => state.articles.articles);
  const searchInput = useSelector(
    (state: RootState) => state.search.searchInput
  );

  const screenWidth = useResize();
  const isMobileView = screenWidth <= 1200;
  const isHomePage = section === "allArticles";
  const isSearchView = window.location.href.includes("/search");

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
  }, [articles, searchInput, section, isSearchView]);

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

  return { articlesToRender, isMobileView, isHomePage, isSearchView };
};
