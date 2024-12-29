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

export const useParseContent = ({
  blocks,
  entityMap,
}: Content): JSX.Element[][] => {
  const parsedContent = blocks.map((block, index) => {
    let text = block.text;
    const components = [];
    let currentPosition = 0;

    while (currentPosition < text.length) {
      if (block.type === "unstyled" && text[currentPosition] === "\n") {
        components.push(<br key={`br-${index}-${currentPosition}`} />);
        currentPosition++;
      } else {
        const alignment = get(block, "data.alignment", "left");
        const entity = block.entityRanges.find(
          (range) => range.offset === currentPosition
        );

        if (entity && entityMap[entity.key].type === "LINK") {
          const url = get(entityMap, `[${entity.key}].data.url`, "#");
          const target = get(
            entityMap,
            `[${entity.key}].data.target`,
            "_blank"
          );

          components.push(
            renderLink(
              text.slice(currentPosition, currentPosition + entity.length),
              url,
              target,
              alignment,
              `link-${index}-${currentPosition}`
            )
          );

          currentPosition += entity.length;
        } else {
          const imageEntity = block.entityRanges.find(
            (range) =>
              range.offset === currentPosition &&
              entityMap[range.key].type === "IMAGE"
          );

          if (imageEntity) {
            const src = get(entityMap, `[${imageEntity.key}].data.src`, "#");
            const imageLength = imageEntity.length;

            components.push(
              renderImage(src, alignment, `image-${index}-${currentPosition}`)
            );

            currentPosition += imageLength;
          } else {
            let styleRanges = block.inlineStyleRanges.filter(
              (range) => range.offset === currentPosition
            );

            let styleComponent = null;

            if (styleRanges.length > 0) {
              const style = styleRanges[0].style.toLowerCase();
              const styleLength = styleRanges[0].length;

              styleComponent = renderStyledText(
                text.slice(currentPosition, currentPosition + styleLength),
                style,
                alignment,
                `${style}-${index}-${currentPosition}`
              );

              currentPosition += styleLength;
            }

            if (styleComponent) {
              components.push(styleComponent);
            } else {
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
          }
        }
      }
    }

    return components;
  });

  return parsedContent;
};
