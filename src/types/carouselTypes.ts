export interface ArticleItem {
  section: string;
  id: string;
  URL: string;
  title: string;
  author: string;
  constent: {
    blocks: { text: string }[];
  };
  createdAt: number;
  date: string;
}

export interface CarouselProps {
  articles: ArticleItem[];
}
