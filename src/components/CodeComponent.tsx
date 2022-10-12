import React from "react";
import styled from "styled-components";
import { ElementProps } from "./Element";

const CodeComponent = ({ attributes, children }: ElementProps) => {
  return <CodeNode {...attributes}>{children}</CodeNode>;
};

const CodeNode = styled.span`
  margin-left: 7px;
  background-color: #ebebeb;
  border-radius: 3px;
  border: 1px solid #dddddd;
  font-size: 15px;
  color: rgba(255, 77, 79, 1);
`;

export default CodeComponent;
