import { FC } from "react";
import { Typography } from "@mui/material";

import { BODY_SX_STYLES } from "../../../constants/articleCard";
import type { TextProps } from "../../../types/articlesTypes";

export const CardBody: FC<TextProps> = ({ text }) => {
  return (
    <Typography variant="body2" color="text.secondary" sx={BODY_SX_STYLES}>
      {text + " ..."}
    </Typography>
  );
};
