import { cloneElement, FC } from "react";

import type { ArticleContentProps } from "../../../types/articlesTypes";

export const ArticleContent: FC<ArticleContentProps> = ({ articleData }) => (
  <>
    {articleData.map((components, index) => (
      <div key={`block-${index}`}>
        {components.map((component, i) =>
          cloneElement(component, { key: `component-${i}` })
        )}
      </div>
    ))}
  </>
);
