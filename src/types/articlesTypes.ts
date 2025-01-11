import { ReactElement, ReactNode } from "react";

import {
  Editor,
  EditorState,
  DraftDecorator,
  DraftHandleValue,
} from "draft-js";

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

export interface TitleProps {
  title: string;
}

export interface AuthorProps {
  author: string;
}

export interface TextProps {
  text: string;
}

export interface TitleProps {
  title: string;
}

export interface HeaderSubtitleProps {
  author: string;
  date: string;
}

export interface UseArticleManagementFormProps {
  articleId: string | undefined;
  section: string | undefined;
  isEdit: boolean;
  editor: React.RefObject<any>;
  editorState: typeof EditorState;
  setEditorState: (editorState: typeof EditorState) => void;
  decorator: typeof DraftDecorator;
}

export interface Article {
  title?: string;
  author?: string;
  date?: string;
  URL?: string;
  constent?: {
    blocks: { text: string }[];
  };
  section?: string;
  createdAt?: string;
  id?: string;
}

export interface HandleSubmitValues {
  title: string;
  author: string;
  date: string;
  imageURL: string;
  section: string;
}

export interface Action {
  id: string;
  icon: ReactNode;
}

export interface ActionBarProps {
  actions: Action[];
}

export interface ArticleManagementFormProps {
  isEdit: boolean;
  articleId: string | undefined;
  section: string | undefined;
}

export interface ArticleManagementModalProps {
  children: ReactNode;
}

export interface EditorSectionProps {
  editorState: typeof EditorState;
  setEditorState: (editorState: typeof EditorState) => void;
  handleKeyCommand: (
    command: string,
    editorState: typeof EditorState
  ) => typeof DraftHandleValue;
  textAlignment: string;
  blockRendererFn: (block: any) => any;
  editorRef: React.RefObject<typeof Editor>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export interface FormFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  className?: string;
  options?: { value: string; label: string }[];
}

interface ModalState {
  manageArticle: {
    isEdit: boolean;
  };
}

export interface RootState {
  modal: ModalState;
}
