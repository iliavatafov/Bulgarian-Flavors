import { SxProps, Theme } from "@mui/system";
import { createTheme } from "@mui/material/styles";

export const searchTheme = createTheme({
  palette: {
    primary: {
      main: "#00d49a",
    },
    secondary: {
      main: "#00d49a",
    },
  },
});

export const gridItemProps = {
  xs: 12,
  sx: { width: "100%" } as SxProps<Theme>,
};

export const SEARCH_SX_STYLES = {
  padding: "1rem",
  "& .MuiInputBase-input": {
    border: "none",
  },
  "& .MuiInputAdornment-root:hover .MuiSvgIcon-root": {
    color: "#00d49a",
  },
};

export const SEARCH_PLACEHOLDER_TEXT = "Намери статия...";
