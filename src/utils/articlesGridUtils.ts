import { pageSize } from "../constants/articlesGrid";

import type { ArticleItem } from "../types/articlesGridTypes";

export const filterArticles = (
  articles: Record<string, ArticleItem[]>,
  searchInput: string,
  section: string,
  isSearchView: boolean
) => {
  let matchedArticles = articles[section];

  if (isSearchView) {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    matchedArticles = articles[section].filter((article: ArticleItem) => {
      const lowerCaseTitle = article.title.toLowerCase();

      return lowerCaseTitle.includes(lowerCaseSearchInput);
    });
  }

  return matchedArticles;
};

export const handlePagination = (
  prevPage: number,
  searchArticles: ArticleItem[],
  articles: Record<string, ArticleItem[]>,
  section: string,
  setArticlesToRender: React.Dispatch<React.SetStateAction<ArticleItem[]>>
): number => {
  const newPage = prevPage + 1;
  const startIndex = (newPage - 1) * pageSize;
  const endIndex = newPage * pageSize;

  if (
    startIndex >= searchArticles.length ||
    startIndex >= articles[section].length
  ) {
    return prevPage;
  }

  const itemsToAppend = searchArticles.length
    ? searchArticles.slice(startIndex, endIndex)
    : articles[section].slice(startIndex, endIndex);

  setArticlesToRender((prevArticles) => [...prevArticles, ...itemsToAppend]);

  return newPage;
};
