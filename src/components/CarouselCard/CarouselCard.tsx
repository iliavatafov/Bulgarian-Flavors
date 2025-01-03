import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";

import { truncateTitle } from "../../utils/carouselUtils";
import {
  CAROUSEL_CARD_AUTHOR_SX_STYLES,
  CAROUSEL_CARD_MEDIA_SX_STYLES,
  CAROUSEL_CARD_SX_STYLES,
  CAROUSEL_CARD_TITLE_SX_STYLES,
  carouselCustomTheme,
} from "../../constants/carousel";
import type { ArticleItem } from "../../types/articlesGridTypes";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const CarouselCard: FC<{ item: ArticleItem }> = ({ item }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const navigateToDetailsPage = useCallback(() => {
    navigate(`/${item.section}/${item.id}`);
  }, [item, navigate]);

  return (
    <ThemeProvider theme={carouselCustomTheme}>
      <Card onClick={navigateToDetailsPage} sx={CAROUSEL_CARD_SX_STYLES}>
        <CardMedia
          component="img"
          sx={CAROUSEL_CARD_MEDIA_SX_STYLES}
          image={item.URL}
          title={item.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant={isMobile ? "h5" : "h4"}
            component="div"
            sx={CAROUSEL_CARD_TITLE_SX_STYLES}
          >
            {truncateTitle(item.title, isMobile)}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={CAROUSEL_CARD_AUTHOR_SX_STYLES}
          >
            Автор: {item.author}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
