import { SxProps, Theme } from "@mui/material";

export const TITLE_STYLE: SxProps<Theme> = {
  textAlign: "left",
  minHeight: 80,
  display: "flex",
  alignItems: "center",
};

export const SUBTITLE_STYLE: SxProps<Theme> = {
  textAlign: "left",
  fontStyle: "italic",
  fontSize: "small",
  marginBottom: 1,
};
