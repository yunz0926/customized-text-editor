import React, { ReactNode } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";
import { LinkElement } from "../../types/custom-types";
import { ElementProps } from ".";

const LinkComponent = ({ attributes, children, element }: ElementProps) => {
  const selected = useSelected();
  const linkElement = element as LinkElement;
  return (
    <LinkNode
      {...attributes}
      onClick={() => window.open(linkElement.url)}
      contentEditable={false}
      style={{ userSelect: "none" }}
      isSelected={selected}
    >
      <img
        style={{ width: 16, height: 16, transform: "translateY(2px)" }}
        src={linkElement.icon}
      />{" "}
      {children}
    </LinkNode>
  );
};

const LinkNode = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  ${({ isSelected }) => isSelected && `box-shadow: 0 0 0 3px #ddd;`}
`;

export default LinkComponent;
