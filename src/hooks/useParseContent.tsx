import { ImageList, ImageListItem, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { JSX } from "react";
import type { Content, TextAlign } from "../types/parseContentTypes";
import { get } from "lodash";

const renderLink = (
  text: string,
  url: string,
  target: string,
  alignment: TextAlign,
  key: string
) => (
  <Link key={key} href={url} target={target} style={{ textAlign: alignment }}>
    {text}
  </Link>
);

const renderImage = (src: string, alignment: TextAlign, key: string) => (
  <ImageList key={key} cols={1} style={{ textAlign: alignment }}>
    <ImageListItem key={key} style={{ textAlign: alignment }}>
      <img src={src} alt="Image" />
    </ImageListItem>
  </ImageList>
);

const renderStyledText = (
  text: string,
  style: string,
  alignment: TextAlign,
  key: string
) => {
  const styleProps: { [key: string]: React.CSSProperties } = {
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
    underline: { textDecoration: "underline" },
  };

  const appliedStyle = styleProps[style] || {};

  return (
    <Typography
      key={key}
      component="span"
      style={{ textAlign: alignment, ...appliedStyle }}
    >
      {text}
    </Typography>
  );
};

const renderHeaderBlock = (
  text: string,
  blockType: string,
  alignment: TextAlign,
  key: string
) => {
  const blockStyleProps: { [key: string]: React.CSSProperties } = {
    "header-one": { fontSize: "2em", fontWeight: "bold" },
    "header-two": { fontSize: "1.5em", fontWeight: "bold" },
    "header-three": { fontSize: "1.17em", fontWeight: "bold" },
  };

  return (
    <Typography
      key={key}
      component="div"
      style={{ textAlign: alignment, ...blockStyleProps[blockType] }}
    >
      {text}
    </Typography>
  );
};

export const useParseContent = ({
  blocks,
  entityMap,
}: Content): JSX.Element[][] => {
  const parsedContent = blocks.map((block, index) => {
    const { text, type, data, entityRanges, inlineStyleRanges } = block;
    const components: JSX.Element[] = [];
    let currentPosition = 0;

    const alignment = get(data, "alignment", "left");

    if (
      type.startsWith("header") ||
      type === "blockquote" ||
      type === "code-block"
    ) {
      switch (type) {
        case "header-one":
        case "header-two":
        case "header-three":
          return [renderHeaderBlock(text, type, alignment, `header-${index}`)];
      }
    }

    while (currentPosition < text.length) {
      const entity = entityRanges.find(
        (range) => range.offset === currentPosition
      );

      if (entity) {
        const { key, length } = entity;
        const entityType = entityMap[key].type;
        const entityText = text.slice(
          currentPosition,
          currentPosition + length
        );

        if (entityType === "LINK") {
          components.push(
            renderLink(
              entityText,
              get(entityMap, `[${key}].data.url`, "#"),
              get(entityMap, `[${key}].data.target`, "_blank"),
              alignment,
              `link-${index}-${currentPosition}`
            )
          );
        } else if (entityType === "IMAGE") {
          components.push(
            renderImage(
              get(entityMap, `[${key}].data.src`, "#"),
              alignment,
              `image-${index}-${currentPosition}`
            )
          );
        }

        currentPosition += length;
        continue;
      }

      const styleRange = inlineStyleRanges.find(
        (range) => range.offset === currentPosition
      );
      if (styleRange) {
        const { style, length } = styleRange;
        components.push(
          renderStyledText(
            text.slice(currentPosition, currentPosition + length),
            style.toLowerCase(),
            alignment,
            `style-${index}-${currentPosition}`
          )
        );
        currentPosition += length;
        continue;
      }

      components.push(
        <Typography
          key={`text-${index}-${currentPosition}`}
          component="span"
          style={{ textAlign: alignment }}
        >
          {text[currentPosition]}
        </Typography>
      );
      currentPosition++;
    }

    return components;
  });

  return parsedContent;
};
