import { FC } from "react";

import type { RenderListBlockProps } from "../../../../types/articlesTypes";

export const ListBlockItem: FC<RenderListBlockProps> = ({
  items,
  blockType,
  alignment,
  key,
}) => {
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
