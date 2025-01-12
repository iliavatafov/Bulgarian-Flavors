import { ReactElement, ReactNode } from "react";

import {
  Editor,
  EditorState,
  DraftHandleValue,
  DraftDecoratorType,
  RawDraftContentState,
} from "draft-js";
import { TextAlign } from "./parseContentTypes";

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
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  decorator: DraftDecoratorType;
}

export interface Article {
  title?: string;
  author?: string;
  date?: string;
  URL?: string;
  constent?: RawDraftContentState;
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
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  handleKeyCommand: (
    command: string,
    editorState: EditorState
  ) => DraftHandleValue;
  textAlignment: any;
  blockRendererFn: (block: any) => any;
  editorRef: React.RefObject<Editor>;
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

export interface RenderHeaderBlockProps {
  text: string;
  blockType: string;
  alignment: TextAlign;
  key: string;
}

export interface RenderImageProps {
  src: string;
  alignment: TextAlign;
  key: string;
}

export interface RenderListBlockProps {
  items: string[];
  blockType: string;
  alignment: TextAlign;
  key: string;
}

export interface RenderStyledTextProps {
  text: string;
  style: string;
  alignment: TextAlign;
  key: string;
}

export interface RenderVideoProps {
  src: string;
  key: string;
}

export interface LinkProps {
  url: string;
  target?: string;
  style?: React.CSSProperties;
  text: string;
  alignment: TextAlign;
}
