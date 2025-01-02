import { FC } from "react";
import { Typography } from "@mui/material";

import { TITLE_STYLE } from "../../../../constants/articleHeaderStyles";
import type { TitleProps } from "../../../../types/articlesTypes";

export const HeaderTitle: FC<TitleProps> = ({ title }) => (
  <Typography gutterBottom variant="h4" component="div" sx={TITLE_STYLE}>
    {title}
  </Typography>
);
