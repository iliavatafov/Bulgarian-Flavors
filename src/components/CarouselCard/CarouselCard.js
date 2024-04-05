import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const CarouselCard = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const title = item.title?.slice(0, isMobile ? 48 : 64);

  const navigate = useNavigate();

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#00d49a",
      },
    },
  });

  const navigateToDetailsPage = () => {
    navigate(`/${item.section}/${item.id}`);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Card
        onClick={navigateToDetailsPage}
        sx={{
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          },
          borderRadius: "0",
          height: "30rem",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "cover",
            height: "360px",
          }}
          image={item.URL}
          title={item.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant={isMobile ? "h5" : "h4"}
            component="div"
            sx={{
              textAlign: "left",
              minHeight: 50,
              display: "flex",
              alignItems: "center",
            }}
          >
            {title.length < item.title.length ? title + " ..." : title}
          </Typography>
          <Typography
            variant="author"
            component="div"
            sx={{
              textAlign: "left",
              fontStyle: "italic",
              fontSize: "small",
              marginBottom: 1,
            }}
          >
            Автор: {item.author}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
