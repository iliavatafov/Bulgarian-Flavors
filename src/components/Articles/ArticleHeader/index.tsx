import { FC } from "react";

import { Typography } from "@mui/material";

import {
  SUBTITLE_STYLE,
  TITLE_STYLE,
} from "../../../constants/articleHeaderStyles";
import type { ArticleHeaderProps } from "../../../types/articlesTypes";

import { ActionBar } from "../../ActionBar";

import styles from "./styles.module.css";

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
