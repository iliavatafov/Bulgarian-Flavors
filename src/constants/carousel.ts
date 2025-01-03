import { createTheme } from "@mui/material/styles";

export const NAVIGATION_BUTTON_POPS = {
  style: {
    backgroundColor: "transparent",
    color: "#00d49a",
    borderRadius: 0,
  },
};

export const CAROUSEL_SX_STYLES = {
  p: 2,
  backgroundColor: "rgb(240 242 245)",
  borderRadius: "0",
  width: "100%",
  border: "none",
  boxShadow: "none",
};

export const carouselCustomTheme = createTheme({
  palette: {
    primary: {
      main: "#00d49a",
    },
  },
});

export const CAROUSEL_CARD_SX_STYLES = {
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  borderRadius: "0",
  display: "flex",
  flexDirection: "column",
};

export const CAROUSEL_CARD_MEDIA_SX_STYLES = {
  objectFit: "cover",
  height: "360px",
};

export const CAROUSEL_CARD_TITLE_SX_STYLES = {
  textAlign: "left",
  minHeight: 50,
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const CAROUSEL_CARD_AUTHOR_SX_STYLES = {
  textAlign: "left",
  fontStyle: "italic",
  fontSize: "small",
  marginBottom: 1,
};
