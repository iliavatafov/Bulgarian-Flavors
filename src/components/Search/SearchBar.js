import React from "react";

import { Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import SearchInputComponent from "./SearchInputComponent";

const SearchBar = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00d49a",
      },
      secondary: {
        main: "#00d49a",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <SearchInputComponent autoFocus />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SearchBar;
