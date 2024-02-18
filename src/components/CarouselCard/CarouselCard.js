import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const CarouselCard = ({ item }) => {
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
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "cover",
            height: "350px",
          }}
          image={item.URL}
          title={item.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{
              textAlign: "left",
              minHeight: 50,
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
