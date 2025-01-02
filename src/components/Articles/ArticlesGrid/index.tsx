import { FC } from "react";

import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import { useArticleGrid } from "../../../hooks/useArticleGrid";

import {
  DESKTOP_ARTICLE_ASPECT,
  EMPTY_STATE_TEXT,
  MOBILE_ARTICLE_ASPECT,
  PAGE_TITLES,
} from "../../../constants/articlesGrid";
import type { ArticleGridProps } from "../../../types/articlesGridTypes";

import { GridHeader } from "./GridHeader";
import { ArticleCard } from "../ArticleCard/index";
import EmptyState from "../../EmptyState/EmptyState";

import styles from "./styles.module.css";

export const ArticleGrid: FC<ArticleGridProps> = ({ isLoading, section }) => {
  const { articlesToRender, isMobileView, isHomePage, isSearchView } =
    useArticleGrid(section, isLoading);

  const articleAspect =
    !isHomePage || isMobileView
      ? MOBILE_ARTICLE_ASPECT
      : DESKTOP_ARTICLE_ASPECT;

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
