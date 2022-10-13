import { useSlate } from "slate-react";
import { Button, Icon } from "./Common";
import { isMarkActive, toggleMark } from "../hooks/useButton";

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

export default MarkButton;
