import { Editor, Transforms, Range, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
import { CustomEditor, LinkElement } from "../types/custom-types";
import isUrl from "is-url";
import { getMetaData } from "../services/api";

const withInlines = (editor: CustomEditor) => {
  const { isInline, isVoid, insertData } = editor;

  editor.isInline = (element) => {
    return ["link", "mention"].includes(element.type) || isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  editor.insertData = async (data) => {
    const text = data.getData("text/plain");
    if (text && isUrl(text)) {
      await wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const wrapLink = async (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const data = await getMetaData(url);
  console.log("urldata", data);

  ReactEditor.focus(editor);

  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: data ? data.title : url }] : [],
    icon: data ? data.icon : "",
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link, { voids: true });
    Transforms.select(editor, {
      anchor: Editor.end(editor, []),
      focus: Editor.end(editor, []),
    });
    Transforms.insertText(editor, " ");
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export default withInlines;
