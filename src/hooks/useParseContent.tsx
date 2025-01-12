import { JSX } from "react";
import { get } from "lodash";

import { ImageList, ImageListItem, Typography } from "@mui/material";
import Link from "@mui/material/Link";

import type { Content, TextAlign } from "../types/parseContentTypes";

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

const renderListBlock = (
  items: string[],
  blockType: string,
  alignment: TextAlign,
  key: string
) => {
  const isOrdered = blockType === "ordered-list-item";
  const ListComponent = isOrdered ? "ol" : "ul";

  return (
    <ListComponent
      key={key}
      style={{ textAlign: alignment, paddingLeft: "1.5em" }}
    >
      {items.map((item, index) => (
        <li key={`${key}-item-${index}`} style={{ textAlign: alignment }}>
          {item}
        </li>
      ))}
    </ListComponent>
  );
};

export const useParseContent = ({
  blocks,
  entityMap,
}: Content): JSX.Element[][] => {
  const parsedContent: JSX.Element[][] = [];
  let currentListItems: string[] = [];
  let currentListType: string | null = null;

  blocks.forEach((block, index) => {
    const { text, type, data, entityRanges, inlineStyleRanges } = block;
    const alignment = get(data, "alignment", "left");

    // Handle list blocks
    if (type === "unordered-list-item" || type === "ordered-list-item") {
      if (currentListType && currentListType !== type) {
        parsedContent.push([
          renderListBlock(
            currentListItems,
            currentListType,
            alignment,
            `list-${index}`
          ),
        ]);
        currentListItems = [];
      }

      currentListType = type;
      currentListItems.push(text);
    } else {
      // Render any pending list items
      if (currentListItems.length > 0) {
        parsedContent.push([
          renderListBlock(
            currentListItems,
            currentListType!,
            alignment,
            `list-${index}`
          ),
        ]);
        currentListItems = [];
        currentListType = null;
      }

      // **Handle header blocks**
      if (type.startsWith("header-")) {
        parsedContent.push([
          renderHeaderBlock(text, type, alignment, `header-${index}`),
        ]);
        return;
      }

      // Handle regular content blocks (unstyled text, links, images)
      const components: JSX.Element[] = [];
      let currentPosition = 0;

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

      parsedContent.push(components);
    }
  });

  // Handle remaining list items
  if (currentListItems.length > 0) {
    parsedContent.push([
      renderListBlock(currentListItems, currentListType!, "left", "final-list"),
    ]);
  }

  return parsedContent;
};
