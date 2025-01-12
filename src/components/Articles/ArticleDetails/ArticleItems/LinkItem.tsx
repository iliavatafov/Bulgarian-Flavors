import { FC } from "react";

import type { LinkProps } from "../../../../types/articlesTypes";

export const LinkItem: FC<LinkProps> = ({
  url,
  target = "_blank",
  style,
  text,
  alignment,
}) => {
  return (
    <a href={url} target={target} style={{ textAlign: alignment, ...style }}>
      {text}
    </a>
  );
};
