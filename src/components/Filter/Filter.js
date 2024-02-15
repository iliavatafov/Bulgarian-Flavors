import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export const Filter = ({ filterOptions }) => {
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
      <Autocomplete
        id="filter"
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            borderColor: "#00d49a",
          },
        }}
        options={filterOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            secondary
            {...params}
            label="Търси по заглавие"
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": {
                backgroundColor: "#f0f2f5",
              },
            }}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.title, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.title, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
};
