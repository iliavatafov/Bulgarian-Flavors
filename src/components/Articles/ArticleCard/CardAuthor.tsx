import { FC } from "react";
import { Typography } from "@mui/material";

import { SUBTITLE_SX_STYLES } from "../../../constants/articleCard";
import type { AuthorProps } from "../../../types/articlesTypes";

export const CardAuthor: FC<AuthorProps> = ({ author }) => {
  return (
    <Typography variant="subtitle2" component="div" sx={SUBTITLE_SX_STYLES}>
      Автор: {author}
    </Typography>
  );
};
