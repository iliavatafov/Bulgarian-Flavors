import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

export const GridHeader = ({ title }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "rgba(240, 242, 245, 0.8)",
        boxShadow: "none",
        paddingBottom: "2rem",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          component="div"
          color="#000"
          style={{
            borderBottom: "1px solid #000",
            width: isLargeScreen ? "30%" : "80%",
            paddingBottom: "0.5rem",
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
