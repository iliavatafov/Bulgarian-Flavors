import { FC } from "react";

import type { ArticleHeaderProps } from "../../../../types/articlesTypes";

import { HeaderTitle } from "./HeaderTitle";

import { HeaderSubtitle } from "./HeaderSubetitle";

export const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  author,
  date,
}) => (
  <div>
    <HeaderTitle title={title} />
    <HeaderSubtitle author={author} date={date} />
  </div>
);
