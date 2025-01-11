import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@mui/material/styles";

import { gridItemProps, searchTheme } from "../../constants/search";

import { SearchInput } from "./SearchInput";

export const SearchBar: FC = () => {
  return (
    <ThemeProvider theme={searchTheme}>
      <Grid container alignItems="center">
        <Grid {...gridItemProps}>
          <SearchInput autoFocus />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
