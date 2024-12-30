import { SectionKey } from "../constants/articlesGrid";

export interface GridHeaderProps {
  title: string;
}

export interface ArticleGridProps {
  isLoading: boolean;
  section: SectionKey;
}

export interface ArticleItem {
  section: string;
  id: string;
  URL: string;
  title: string;
  author: string;
  createdAt: number;
  date: string;
  constent: {
    blocks: { text: string }[];
  };
}

export interface RootState {
  articles: {
    articles: Record<string, ArticleItem[]>;
  };
  search: {
    searchInput: string;
  };
}
