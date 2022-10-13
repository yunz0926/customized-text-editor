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

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export type LinkElement = {
  type: "link";
  url: string;
  children: Descendant[];
  icon?: string;
};

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
