import { FC } from "react";
import { ImageList, ImageListItem } from "@mui/material";

import { ALT_IMAGE_TEXT } from "../../../../constants/articleDetails";
import type { RenderImageProps } from "../../../../types/articlesTypes";

export const ImageItem: FC<RenderImageProps> = ({ src, alignment, key }) => (
  <ImageList key={key} cols={1} style={{ textAlign: alignment }}>
    <ImageListItem key={key}>
      <img src={src} alt={ALT_IMAGE_TEXT} />
    </ImageListItem>
  </ImageList>
);
