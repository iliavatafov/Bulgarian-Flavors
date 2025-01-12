import { FC } from "react";
import { Typography } from "@mui/material";

import { blockStyleProps } from "../../../../constants/articleDetails";
import type { RenderHeaderBlockProps } from "../../../../types/articlesTypes";

export const HeaderItem: FC<RenderHeaderBlockProps> = ({
  text,
  blockType,
  alignment,
  key,
}) => {
  return (
    <Typography
      key={key}
      component="div"
      style={{ textAlign: alignment, ...blockStyleProps[blockType] }}
    >
      {text}
    </Typography>
  );
};
