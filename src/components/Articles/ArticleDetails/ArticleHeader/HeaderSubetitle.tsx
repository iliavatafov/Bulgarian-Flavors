import { FC } from "react";
import { Typography } from "@mui/material";

import { SUBTITLE_STYLE } from "../../../../constants/articleHeaderStyles";
import type { HeaderSubtitleProps } from "../../../../types/articlesTypes";

import { ActionBar } from "../../../ActionBar";

import styles from "./styles.module.css";

export const HeaderSubtitle: FC<HeaderSubtitleProps> = ({ author, date }) => (
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
);
