import { Paper } from "@mui/material";
import { CarouselCard } from "../../components/CarouselCard/CarouselCard.js";
import Carousel from "react-material-ui-carousel";

import styles from "./Carousel.module.css";

export const CarouselComponent = ({ articles }) => {
  return (
    <Carousel
      animation="slide"
      autoPlay={true}
      stopAutoPlayOnHover={true}
      swipe
      timeout={500}
      navButtonsProps={{
        style: {
          backgroundColor: "transparent",
          color: "#00d49a",
          borderRadius: 0,
        },
      }}
      className={styles["carousel-wrapper"]}
    >
      {articles.map((item) => (
        <Paper
          key={item.id}
          sx={{
            p: 2,
            backgroundColor: "rgb(240 242 245)",
            borderRadius: "0",
            width: "100%",
            border: "none",
            boxShadow: "none",
          }}
          className={styles.paper}
        >
          <CarouselCard item={item} />
        </Paper>
      ))}
    </Carousel>
  );
};
