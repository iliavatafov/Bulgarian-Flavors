export interface ArticleItem {
  section: string;
  id: string;
  URL: string;
  title: string;
  author: string;
  constent: {
    blocks: { text: string }[];
  };
}

export interface CarouselProps {
  articles: ArticleItem[];
}
