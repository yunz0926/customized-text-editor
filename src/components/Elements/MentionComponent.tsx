import React, { ReactNode } from "react";
import styled from "styled-components";
import { useSelected, useFocused } from "slate-react";
import { MentionElement } from "../../types/custom-types";

interface MentionComponentProps {
  children: ReactNode;
  attributes: any;
  element: MentionElement;
}

const MentionComponent = ({
  attributes,
  children,
  element,
}: MentionComponentProps) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <MentionNode
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(" ", "-")}`}
      selected={selected}
      focused={focused}
    >
      {children}@{element.character}
    </MentionNode>
  );
};

const MentionNode = styled.div<{ selected: boolean; focused: boolean }>`
  ${({ selected, focused }) => `
  display: inline-flex;
  align-items: center;
  padding: 3px 3px 2px;
  margin: 0 1px;
  vertical-align: baseline;
  border-radius: 4px;
  background-color: #eee;
  font-size: 15px;
  box-shadow: ${selected && focused ? "0 0 0 2px #B4D5FF" : "none"};
  `}
`;

export default MentionComponent;
