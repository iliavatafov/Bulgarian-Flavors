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

  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    setArticlesToRender(articles[section].slice(0, pageSize));
  }, [articles]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const loadPoint = scrollHeight - (window.innerWidth < 801 ? 2000 : 1400);

    if (scrollTop + windowHeight >= loadPoint && !isLoading) {
      setPage((prevPage) => prevPage + 1);

      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      setArticlesToRender((prevArticles) => [
        ...prevArticles,
        ...articles[section].slice(startIndex, endIndex),
      ]);
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
          <GridHeader title={pageTitles[section]} />
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
