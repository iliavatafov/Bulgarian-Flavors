import { ReactElement } from "react";

export interface AdminActionsProps {
  editArticle: () => void;
  openDeleteModal: () => void;
}

export interface ArticleCardProps {
  item: {
    section: string;
    id: string;
    URL: string;
    title: string;
    author: string;
    constent: {
      blocks: { text: string }[];
    };
  };
}

export interface ArticleContentProps {
  articleData: ReactElement[][];
}

export interface CurrentUser {
  currentUser: string;
  uid: string;
}

export interface ArticleHeaderProps {
  title: string;
  author: string;
  date: string;
}
