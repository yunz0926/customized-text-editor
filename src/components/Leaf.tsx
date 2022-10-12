import React, { ReactNode } from "react";
import { useSelected } from "slate-react";
import styled from "styled-components";

export interface LeafProps {
  children: ReactNode;
  attributes: any;
  leaf: any;
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  return (
    <LeafNode
      {...attributes}
      {...(leaf.highlight && { "data-cy": "search-highlighted" })}
      onClick={() => {
        if (!leaf.duration) return;
        console.log(leaf.duration);
      }}
      {...leaf}
    >
      {children}
    </LeafNode>
  );
};

const LeafNode = styled.span<{
  bold: boolean;
  lineThrough: boolean;
  italic: boolean;
  color: string;
  textDecoration: string;
  duration: number;
}>`
  ${({ bold, lineThrough, italic, color, textDecoration, duration }) => `
    font-weight: ${bold && "bold"};
    color: ${color};
    text-decoration: ${lineThrough ? "line-through" : textDecoration};
    font-style: ${italic && "italic"};
    cursor: ${duration && "pointer"};
  `}
`;

export default Leaf;
