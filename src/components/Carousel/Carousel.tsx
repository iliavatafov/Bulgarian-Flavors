import { FC } from "react";
import { Paper } from "@mui/material";
import { CarouselCard } from "../CarouselCard/CarouselCard";
import Carousel from "react-material-ui-carousel";

import {
  CAROUSEL_SX_STYLES,
  NAVIGATION_BUTTON_POPS,
} from "../../constants/carousel";
import type { ArticleItem, CarouselProps } from "../../types/carouselTypes.js";

import styles from "./Carousel.module.css";

export const CarouselComponent: FC<CarouselProps> = ({ articles }) => {
  return (
    <Carousel
      animation="slide"
      autoPlay={true}
      stopAutoPlayOnHover={true}
      swipe
      navButtonsProps={NAVIGATION_BUTTON_POPS}
      className={styles["carousel-wrapper"]}
    >
      {articles.map((item: ArticleItem) => (
        <Paper key={item.id} sx={CAROUSEL_SX_STYLES} className={styles.paper}>
          <CarouselCard item={item} />
        </Paper>
      ))}
    </Carousel>
  );
};
