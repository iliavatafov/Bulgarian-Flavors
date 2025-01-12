import { FC, useMemo } from "react";

import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";

import { useArticleGrid } from "../../../hooks/useArticleGrid";

import {
  DESKTOP_ARTICLE_ASPECT,
  EMPTY_STATE_TEXT,
  GRID_STYLE,
  MOBILE_ARTICLE_ASPECT,
  PAGE_TITLES,
} from "../../../constants/articlesGrid";
import type {
  ArticleAspect,
  ArticleGridProps,
} from "../../../types/articlesGridTypes";

import { GridHeader } from "./GridHeader";
import { ArticleCard } from "../ArticleCard/index";
import { EmptyState } from "../../EmptyState/EmptyState";

import styles from "./styles.module.css";

export const ArticleGrid: FC<ArticleGridProps> = ({ isLoading, section }) => {
  const { articlesToRender, isMobileView, isHomePage, getGridClassName } =
    useArticleGrid(section, isLoading);

  const articleAspect = useMemo(() => {
    return !isHomePage || isMobileView
      ? MOBILE_ARTICLE_ASPECT
      : DESKTOP_ARTICLE_ASPECT;
  }, [isHomePage, isMobileView]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (articlesToRender.length === 0 && !isLoading) {
    return <EmptyState text={EMPTY_STATE_TEXT} />;
  }

  return (
    <div className={styles.container}>
      {articlesToRender.length > 0 && (
        <>
          <GridHeader title={PAGE_TITLES[section]} />
          <Grid
            container
            style={GRID_STYLE}
            className={styles[getGridClassName(articleAspect as ArticleAspect)]}
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
