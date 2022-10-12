import React, { useMemo, useCallback } from "react";
import { withHistory } from "slate-history";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { Toolbar, Button, Icon } from "./Common";
import { CustomEditor } from "./custom-types";
import Element, { ElementProps } from "./Element";
import Leaf, { LeafProps } from "./Leaf";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const TextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(
    (props: JSX.IntrinsicAttributes & ElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: JSX.IntrinsicAttributes & LeafProps) => <Leaf {...props} />,
    []
  );
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(elements: any) => {
        console.log("elements", elements);
      }}
    >
      <Toolbar>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="lineThrough" icon="lineThrough" />
        <BlockButton format="code" icon="code" />
        <BlockButton format="code-block" icon="code-block" />
        <BlockButton format="quote" icon="quote" />
        <BlockButton format="numbered-list" icon="list_numbered" />
        <BlockButton format="bulleted-list" icon="list_bulleted" />
      </Toolbar>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export default TextEditor;

const BlockButton = ({ format, icon }: { format: any; icon: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }: { format: any; icon: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (
  editor: CustomEditor,
  format: any,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor: CustomEditor, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: CustomEditor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "This is a Text Editor" }],
  },
];
