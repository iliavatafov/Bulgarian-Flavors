import { FC } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getHeaderStyles } from "../../../utils/gridHeaderUtils";

import {
  APP_BAR_STYLES,
  HOME_VIEW_TITLES,
  TOOLBAR_STYLES,
} from "../../../constants/articlesGrid";
import type { GridHeaderProps } from "../../../types/articlesGridTypes";

export const GridHeader: FC<GridHeaderProps> = ({ title }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isHomeView = HOME_VIEW_TITLES.includes(title);

  return (
    <AppBar position="static" style={APP_BAR_STYLES}>
      <Toolbar style={TOOLBAR_STYLES}>
        <Typography
          variant="h4"
          component="div"
          color="#000"
          sx={getHeaderStyles(isHomeView, isLargeScreen)}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
