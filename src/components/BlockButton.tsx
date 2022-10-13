import { Button, Icon } from "./Common";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../hooks/useButton";

const BlockButton = ({ format, icon }: { format: any; icon: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format
        //TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
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

export default BlockButton;
