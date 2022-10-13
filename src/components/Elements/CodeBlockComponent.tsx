import React from "react";
import styled from "styled-components";
import { ElementProps } from ".";

const CodeBlockComponent = ({ attributes, children }: ElementProps) => {
  return <CodeBlockNode {...attributes}>{children}</CodeBlockNode>;
};

export default CodeBlockComponent;

const CodeBlockNode = styled.div`
  width: 500px;
  margin-left: 7px;
  padding: 5px;
  background-color: #ebebeb;
  border-radius: 3px;
  border: 1px solid #dddddd;
  font-size: 15px;
  color: #5f5f5f;
`;
