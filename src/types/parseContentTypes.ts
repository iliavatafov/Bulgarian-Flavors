export type TextAlign = "left" | "right" | "center" | "justify" | "inherit";

type ContentBlock = {
  text: string;
  type: string;
  data?: {
    alignment?: TextAlign;
  };
  entityRanges: {
    offset: number;
    length: number;
    key: number;
  }[];
  inlineStyleRanges: {
    offset: number;
    length: number;
    style: string;
  }[];
};

type ContentEntity = {
  type: string;
  data: {
    url?: string;
    target?: string;
    src?: string;
  };
};

export type Content = {
  blocks: ContentBlock[];
  entityMap: Record<number, ContentEntity>;
};
