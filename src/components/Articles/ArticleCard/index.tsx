import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  BODY_SX_STYLES,
  CARD_SX_STYLES,
  CARD_THEME,
  SUBTITLE_SX_STYLES,
  TITLE_SX_STYLES,
} from "../../../constants/articleCard.ts";
import type { ArticleCardProps } from "../../../types/articlesTypes.ts";

import { ActionBar } from "../../ActionBar/index.tsx";

import styles from "./styles.module.css";

export const ArticleCard: FC<ArticleCardProps> = ({ item }) => {
  const { section, id, URL, title, author, constent } = item;
  const text = get(constent, "blocks[0].text", "").slice(0, 200);
  const articlePath = `${section}/${id}`;

  const navigate = useNavigate();

  const navigateToDetailsPage = useCallback(() => {
    navigate(articlePath);
  }, [navigate, articlePath]);

  const memoizedTheme = useMemo(() => createTheme(CARD_THEME), []);

  const titleElement = (
    <Typography gutterBottom variant="h5" component="div" sx={TITLE_SX_STYLES}>
      {title}
    </Typography>
  );

  const authorElement = (
    <Typography variant="subtitle2" component="div" sx={SUBTITLE_SX_STYLES}>
      Автор: {author}
    </Typography>
  );

  const bodyElement = (
    <Typography variant="body2" color="text.secondary" sx={BODY_SX_STYLES}>
      {text + " ..."}
    </Typography>
  );

  return (
    <ThemeProvider theme={memoizedTheme}>
      <Card onClick={navigateToDetailsPage} sx={CARD_SX_STYLES}>
        <CardMedia sx={{ height: 250 }} image={URL} title={title} />
        <CardContent>
          {titleElement}
          {authorElement}
          {bodyElement}
          <div className={styles["action-bar"]}>
            <ActionBar articleUrl={window.location.href + articlePath} />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
