import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { withHistory } from "slate-history";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { Editor, Transforms, createEditor, Descendant, Range } from "slate";
import { Toolbar, Portal } from "./Common";
import { CustomEditor, MentionElement } from "../types/custom-types";
import Element, { ElementProps } from "./Elements";
import Leaf, { LeafProps } from "./Leaf";
import withInlines from "../plugins/withInlines";
import pipe from "lodash/fp/pipe";
import { CHARACTERS } from "../datas/charaters";
import MarkButton from "./MarkButton";
import BlockButton from "./BlockButton";

const createEditorWithPlugins = pipe(withReact, withHistory, withInlines);

const TextEditor = () => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<Range | null>(null);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const renderElement = useCallback(
    (props: JSX.IntrinsicAttributes & ElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: JSX.IntrinsicAttributes & LeafProps) => <Leaf {...props} />,
    []
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLocaleLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (target) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            e.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            e.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            e.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target]
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = portalRef.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();

      if (!el) return;

      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(elements: any) => {
        const { selection } = editor;
        console.log("elements", elements);
        console.log("selection", selection);

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            setIndex(0);
            return;
          }
        }

        setTarget(null);
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
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
      {target && chars.length > 0 && (
        <Portal>
          <div
            ref={portalRef}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 1,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
            data-cy="mentions-portal"
          >
            {chars.map((char, i) => (
              <div
                key={char}
                style={{
                  padding: "1px 3px",
                  borderRadius: "3px",
                  background: i === index ? "#B4D5FF" : "transparent",
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};

export default TextEditor;

const insertMention = (editor: CustomEditor, character: string) => {
  const mention: MentionElement = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "This is a Text Editor" }],
  },
];
