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
  SUBTITLE_SX_STYLES,
  TITLE_SX_STYLES,
} from "../../constants/articleCard.ts";

import { ActionBar } from "../ActionBar/index.tsx";

import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  item: {
    section: string;
    id: string;
    URL: string;
    title: string;
    author: string;
    constent: {
      blocks: { text: string }[];
    };
  };
}

export const ArticleCard: FC<ArticleCardProps> = ({ item }) => {
  const { section, id, URL, title, author, constent } = item;
  const text = get(constent, "blocks[0].text", "").slice(0, 200);
  const articleUrl = `/${section}/${id}`;

  const navigate = useNavigate();
  const navigateToDetailsPage = useCallback(() => {
    navigate(articleUrl);
  }, [navigate, articleUrl]);

  const memoizedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#00d49a",
          },
        },
      }),
    []
  );

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
            <ActionBar articleUrl={window.location.href + articleUrl} />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
