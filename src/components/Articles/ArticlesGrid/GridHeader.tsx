import { FC } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  appBarStyles,
  toolbarStyles,
  typographyStyles,
} from "../../../constants/articlesGrid";
import type { GridHeaderProps } from "../../../types/articlesGridTypes";

export const GridHeader: FC<GridHeaderProps> = ({ title }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isHomeView = ["Новини", "Най-четени"].includes(title);

  return (
    <AppBar position="static" style={appBarStyles}>
      <Toolbar style={toolbarStyles}>
        <Typography
          variant="h4"
          component="div"
          color="#000"
          sx={{
            ...typographyStyles,
            width: isHomeView ? "100%" : isLargeScreen ? "30%" : "80%",
            textAlign: isHomeView ? "left" : "center",
            paddingLeft: isHomeView ? "2rem" : "0",
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
