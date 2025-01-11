import { FC } from "react";

import { Typography } from "@mui/material";

import { TITLE_SX_STYLES } from "../../../constants/articleCard";
import type { TitleProps } from "../../../types/articlesTypes";

export const CardTitle: FC<TitleProps> = ({ title }) => {
  return (
    <Typography gutterBottom variant="h5" component="div" sx={TITLE_SX_STYLES}>
      {title}
    </Typography>
  );
};
