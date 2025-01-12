import { FC } from "react";
import { Typography } from "@mui/material";

import { styleProps } from "../../../../constants/articleDetails";
import type { RenderStyledTextProps } from "../../../../types/articlesTypes";

export const StyledTextItem: FC<RenderStyledTextProps> = ({
  text,
  style,
  alignment,
  key,
}) => {
  return (
    <Typography
      key={key}
      component="span"
      style={{ textAlign: alignment, ...styleProps[style] }}
    >
      {text}
    </Typography>
  );
};
