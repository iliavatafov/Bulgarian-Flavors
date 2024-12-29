import { FC } from "react";

import { Typography } from "@mui/material";

import {
  SUBTITLE_STYLE,
  TITLE_STYLE,
} from "../../constants/articleHeaderStyles";

import { ActionBar } from "../ActionBar";

import styles from "./ArticleDetails.module.css";

interface ArticleHeaderProps {
  title: string;
  author: string;
  date: string;
}

export const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  author,
  date,
}) => (
  <div>
    <Typography gutterBottom variant="h4" component="div" sx={TITLE_STYLE}>
      {title}
    </Typography>
    <div className={styles["subtitle"]}>
      <div>
        <Typography variant="subtitle2" component="div" sx={SUBTITLE_STYLE}>
          Автор: {author}
        </Typography>
        <Typography variant="subtitle2" component="div" sx={SUBTITLE_STYLE}>
          Дата: {date}
        </Typography>
      </div>
      <ActionBar />
    </div>
  </div>
);
