import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { GridHeader } from "./GridHeader";
import { ArticleCard } from "../../components/Articles/ArticleCard";

import styles from "./ArticlesGrid.module.css";

const pageSize = 10;
const pageTitles = {
  wineAndFood: "Вино и храна",
  tourismInitiatives: "Инициативи за туризма",
  nextDestination: "Следваща дестицания",
};

export const ArticleGrid = ({ isLoading, section }) => {
  const [page, setPage] = useState(2);
  const [articlesToRender, setArticlesToRender] = useState([]);
  const [searchArticles, seatSearchArticles] = useState([]);

  const articles = useSelector((state) => state.articles.articles);
  const searchInput = useSelector((state) => state.search.searchInput);

  useEffect(() => {
    let matchedArticles = articles[section];

    if (window.location.href.includes("/search")) {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      matchedArticles = articles[section].filter((article) => {
        const lowerCaseTitle = article.title.toLowerCase();

        return lowerCaseTitle.includes(lowerCaseSearchInput);
      });
    }

    setArticlesToRender(matchedArticles.slice(0, pageSize));
    seatSearchArticles(matchedArticles);
    setPage(2);
  }, [articles, searchInput]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const loadPoint = scrollHeight - (window.innerWidth < 801 ? 2000 : 1400);

    if (scrollTop + windowHeight >= loadPoint && !isLoading) {
      setPage((prevPage) => prevPage + 1);

      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      if (searchArticles.length) {
        setArticlesToRender((prevArticles) => [
          ...prevArticles,
          ...searchArticles.slice(startIndex, endIndex),
        ]);
      } else {
        setArticlesToRender((prevArticles) => [
          ...prevArticles,
          ...articles[section].slice(startIndex, endIndex),
        ]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {section !== "allArticles" && (
            <GridHeader title={pageTitles[section]} />
          )}
          <Grid
            container
            style={{ margin: 0, gap: "3rem" }}
            className={styles["grid-container"]}
          >
            {articlesToRender.length > 0 &&
              articlesToRender.map((item) => (
                <Grid
                  key={item.id}
                  item
                  xs={12}
                  md={6}
                  lg={4}
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