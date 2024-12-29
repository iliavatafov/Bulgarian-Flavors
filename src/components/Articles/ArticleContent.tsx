import { cloneElement, FC, ReactElement } from "react";

interface ArticleContentProps {
  articleData: ReactElement[][];
}

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
