import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

export const GridHeader = ({ title }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isHomeView = ["Новини", "Най-четени"].includes(title);
  const width = isHomeView ? "100%" : isLargeScreen ? "30%" : "80%";

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "rgba(240, 242, 245, 0.8)",
        boxShadow: "none",
        paddingBottom: "1rem",
      }}
    >
      <Toolbar
        style={{ display: "flex", justifyContent: "center", padding: "0" }}
      >
        <Typography
          variant="h4"
          component="div"
          color="#000"
          sx={{
            borderBottom: "1px solid #00d49a",
            width: width,
            paddingBottom: "0.3rem",
            textAlign: isHomeView ? "left" : "center",
            paddingLeft: isHomeView ? "2rem" : "0",
            color: "#000",
            fontSize: "1.4rem",
            fontStyle: "italic",
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
