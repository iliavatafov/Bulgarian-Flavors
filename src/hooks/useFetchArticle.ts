import { useEffect, useState, useCallback, ReactElement } from "react";
import { useParseContent } from "./useParseContent";

import ArticlesAPI from "../services/articles";

import { Content } from "../types/parseContentTypes";

interface ArticleResponse {
  createdAt: number;
  id?: string;
  title?: string;
  author?: string;
  date?: string;
  URL?: string;
  constent?: Content;
}

export const useFetchArticle = (section: string, articleId: string) => {
  const [articleData, setArticleData] = useState<ReactElement[][]>([]);
  const [rawData, setRawData] = useState<ArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Boolean>(false);

  const getArticle = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response: ArticleResponse | undefined =
        await ArticlesAPI.getArticleById(section, articleId);

      if (response?.constent) {
        const parsedData = useParseContent(response.constent);
        setRawData(response);
        setArticleData(parsedData);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error("Error fetching article:", err);
    } finally {
      setIsLoading(false);
    }
  }, [section, articleId]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return { articleData, rawData, isLoading, error };
};
