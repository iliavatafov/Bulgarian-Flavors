import { ContentBlock, ContentState } from "draft-js";

export interface LinkProps {
  contentState: ContentState;
  entityKey: string;
  children: React.ReactNode;
}

export interface ImageComponentProps {
  block: ContentBlock;
  contentState: ContentState;
}

export interface VideoComponentProps {
  block: ContentBlock;
  contentState: ContentState;
}
