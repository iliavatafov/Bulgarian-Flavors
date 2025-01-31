import { alpha, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    greenCyan: Palette["primary"];
    darkblue: Palette["primary"];
    lightblue: Palette["primary"];
  }
  interface PaletteOptions {
    greenCyan?: PaletteOptions["primary"];
    darkblue?: PaletteOptions["primary"];
    lightblue?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    greenCyan: true;
    darkblue: true;
    lightblue: true;
  }
}

const greenCyanMain = "#00d49a";
const darkblueMain = "#001e59";
const lightblueMain = "#489dfe";

export const styledButtonTheme = createTheme({
  palette: {
    greenCyan: {
      main: greenCyanMain,
      light: alpha(greenCyanMain, 0.5),
      dark: alpha(greenCyanMain, 0.9),
      contrastText: "#fff",
    },
    darkblue: {
      main: darkblueMain,
      light: alpha(darkblueMain, 0.5),
      dark: alpha(darkblueMain, 0.9),
      contrastText: "#fff",
    },
    lightblue: {
      main: lightblueMain,
      light: alpha(lightblueMain, 0.5),
      dark: alpha(lightblueMain, 0.9),
      contrastText: "#fff",
    },
  },
});
