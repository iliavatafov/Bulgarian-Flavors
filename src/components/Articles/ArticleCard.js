import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { ActionBar } from "../ActionBar/ActionBar";

import styles from "./ArticleCard.module.css";

export const ArticleCard = ({ item }) => {
  const text = item.constent.blocks[0]?.text?.slice(0, 200);

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
        <CardMedia sx={{ height: 250 }} image={item.URL} title={item.title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: "left",
              minHeight: 80,
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.title}
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "left", marginBottom: "8px" }}
          >
            {text + " ..."}
          </Typography>
          <div className={styles["action-bar"]}>
            <ActionBar />
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
