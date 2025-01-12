import { JSX } from "react";
import { get } from "lodash";
import { Typography } from "@mui/material";

import type { Content, TextAlign } from "../types/parseContentTypes";

import { LinkItem } from "../components/Articles/ArticleDetails/ArticleItems/LinkItem";
import { ImageItem } from "../components/Articles/ArticleDetails/ArticleItems/ImageItem";
import { VideoItem } from "../components/Articles/ArticleDetails/ArticleItems/VideoItem";
import { StyledTextItem } from "../components/Articles/ArticleDetails/ArticleItems/StyledTextItem";
import { HeaderItem } from "../components/Articles/ArticleDetails/ArticleItems/HeaderItem";
import { ListBlockItem } from "../components/Articles/ArticleDetails/ArticleItems/ListBlockItem";

export const useParseContent = ({
  blocks,
  entityMap,
}: Content): JSX.Element[][] => {
  const parsedContent: JSX.Element[][] = [];
  let currentListItems: string[] = [];
  let currentListType: string | null = null;

  blocks.forEach((block: any, index) => {
    const { text, type, data, entityRanges, inlineStyleRanges } = block;
    const alignment: TextAlign = get(data, "alignment", "left");

    // Handle list blocks
    if (type === "unordered-list-item" || type === "ordered-list-item") {
      if (currentListType && currentListType !== type) {
        parsedContent.push([
          <ListBlockItem
            key={`list-${index}`}
            items={currentListItems}
            blockType={currentListType!}
            alignment={alignment}
          />,
        ]);
        currentListItems = [];
      }

      currentListType = type;
      currentListItems.push(text);
    } else {
      // Render any pending list items
      if (currentListItems.length > 0) {
        parsedContent.push([
          <ListBlockItem
            key={`list-${index}`}
            items={currentListItems}
            blockType={currentListType!}
            alignment={alignment}
          />,
        ]);
        currentListItems = [];
        currentListType = null;
      }

      // Handle headers
      if (type.startsWith("header-")) {
        parsedContent.push([
          <HeaderItem
            key={`header-${index}`}
            text={text}
            blockType={type}
            alignment={alignment}
          />,
        ]);
        return;
      }

      // Handle regular content blocks (unstyled text, links, images, videos)
      const components: JSX.Element[] = [];
      let currentPosition = 0;

      while (currentPosition < text.length) {
        if (text[currentPosition] === "\n") {
          components.push(<br key={`br-${index}-${currentPosition}`} />);
          currentPosition++;
          continue;
        }

        const entity = entityRanges.find(
          (range: any) => range.offset === currentPosition
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
              <LinkItem
                text={entityText}
                url={get(entityMap, `[${key}].data.url`, "#")}
                target={get(entityMap, `[${key}].data.target`, "_blank")}
                alignment={alignment}
                key={`link-${index}-${currentPosition}`}
              />
            );
          } else if (entityType === "IMAGE") {
            components.push(
              <ImageItem
                key={`image-${index}-${currentPosition}`}
                src={get(entityMap, `[${key}].data.src`, "#")}
                alignment={alignment}
              />
            );
          } else if (entityType === "VIDEO") {
            components.push(
              <VideoItem
                key={`video-${index}-${currentPosition}`}
                src={get(entityMap, `[${key}].data.src`, "#")}
              />
            );
          }

          currentPosition += length;
          continue;
        }

        const styleRange = inlineStyleRanges.find(
          (range: any) => range.offset === currentPosition
        );
        if (styleRange) {
          const { style, length } = styleRange;

          components.push(
            <StyledTextItem
              text={text.slice(currentPosition, currentPosition + length)}
              style={style.toLowerCase()}
              alignment={alignment}
              key={`style-${index}-${currentPosition}`}
            />
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
      <ListBlockItem
        key="final-list"
        items={currentListItems}
        blockType={currentListType!}
        alignment="left"
      />,
    ]);
  }

  return parsedContent;
};
