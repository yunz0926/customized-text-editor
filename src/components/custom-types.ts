import {
  Text,
  createEditor,
  Node,
  Element,
  Editor,
  Descendant,
  BaseEditor,
} from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// export type BlockQuoteElement = {
//   type: "block-quote";
//   align?: string;
//   children: Descendant[];
// };

// export type BulletedListElement = {
//   type: "bulleted-list";
//   align?: string;
//   children: Descendant[];
// };

// export type CheckListItemElement = {
//   type: "check-list-item";
//   checked: boolean;
//   children: Descendant[];
// };

// export type EditableVoidElement = {
//   type: "editable-void";
//   children: EmptyText[];
// };

// export type HeadingElement = {
//   type: "heading";
//   align?: string;
//   children: Descendant[];
// };

// export type HeadingTwoElement = {
//   type: "heading-two";
//   align?: string;
//   children: Descendant[];
// };

// export type ImageElement = {
//   type: "image";
//   url: string;
//   children: EmptyText[];
// };

export type LinkElement = {
  type: "link";
  url: string;
  children: Descendant[];
  icon?: string;
};

// export type TimeStampElement = {
//   type: "timestamp";
//   children: Descendant[];
// };

// export type ButtonElement = { type: "button"; children: Descendant[] };

// export type ListItemElement = { type: "list-item"; children: Descendant[] };

export type MentionElement = {
  type: "mention";
  character: string;
  children: Descendant[];
};

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: Descendant[] | CustomElement[];
};

export type CodeElement = {
  type: "code";
  children: Descendant[];
};

export type CodeBlockElement = {
  type: "code-block";
  children: Descendant[];
};

export type QuoteElement = {
  type: "quote";
  children: Descendant[];
};

export type BulletedListElement = {
  type: "bulleted-list";
  children: Descendant[];
};

export type ListItemElement = {
  type: "list-item";
  chldren: Descendant[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: Descendant[];
};

export type CustomElement =
  | ParagraphElement
  | LinkElement
  | MentionElement
  | QuoteElement
  | CodeElement
  | CodeBlockElement
  | BulletedListElement
  | ListItemElement
  | NumberedListElement;

export type CustomText = {
  bold?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
