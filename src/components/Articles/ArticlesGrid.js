import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import { debounce } from "lodash";

import { GridHeader } from "./GridHeader";
import { ArticleCard } from "../../components/Articles/ArticleCard";
import EmptyState from "../EmptyState/EmptyState";

import styles from "./ArticlesGrid.module.css";

const pageSize = 10;
const pageTitles = {
  wineAndFood: "Вино и храна",
  tourismInitiatives: "Инициативи за туризма",
  nextDestination: "Следваща дестицания",
  allArticles: "Новини",
};

export const ArticleGrid = ({ isLoading, section }) => {
  const [page, setPage] = useState(2);
  const [articlesToRender, setArticlesToRender] = useState([]);
  const [searchArticles, setSearchArticles] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [articleAspect, setArticleAspect] = useState({
    xs: 12,
    md: 6,
    lg: 5.7,
    mid: false,
  });

  const articles = useSelector((state) => state.articles.articles);
  const searchInput = useSelector((state) => state.search.searchInput);

  const isHomePage = section === "allArticles";
  const isSearchView = window.location.href.includes("/search");

  useEffect(() => {
    const handleResize = debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobileView(screenWidth <= 1200);
  }, [screenWidth]);

  useEffect(() => {
    let matchedArticles = articles[section];

    if (isSearchView) {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      matchedArticles = articles[section].filter((article) => {
        const lowerCaseTitle = article.title.toLowerCase();

        return lowerCaseTitle.includes(lowerCaseSearchInput);
      });
    }

    const aspect =
      !isHomePage || isMobileView
        ? { xs: 16, md: 6, lg: 8, mid: true }
        : { xs: 12, md: 6, lg: 5.7, mid: false };
    setArticleAspect(aspect);

    setArticlesToRender(matchedArticles.slice(0, pageSize));
    setSearchArticles(matchedArticles);
    setPage(2);
  }, [articles, searchInput, isHomePage, isMobileView, isSearchView]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const loadPoint = scrollHeight - (window.innerWidth < 801 ? 2000 : 1400);

    if (scrollTop + windowHeight >= loadPoint && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const itemsToAppend = searchArticles.length
        ? searchArticles.slice(startIndex, endIndex)
        : articles[section].slice(startIndex, endIndex);
      setArticlesToRender((prevArticles) => [
        ...prevArticles,
        ...itemsToAppend,
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, handleScroll]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        articlesToRender.length > 0 && (
          <>
            <GridHeader title={pageTitles[section]} />
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
                  item
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
        )
      )}
      {articlesToRender.length === 0 && !isLoading && isSearchView && (
        <EmptyState text="Не са намерени статии с посоченото име." />
      )}
    </div>
  );
};
