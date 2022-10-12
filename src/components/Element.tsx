import React, { ReactNode } from "react";
import { CustomElement } from "./custom-types";
import CodeBlockComponent from "./CodeBlockComponent";
import CodeComponent from "./CodeComponent";

export interface ElementProps {
  children: ReactNode;
  attributes: any;
  element: CustomElement;
}

const Element = (props: ElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "code":
      return <CodeComponent {...props} />;
    case "code-block":
      return <CodeBlockComponent {...props} />;
    case "quote":
      return (
        <div
          style={{
            paddingLeft: "10px",
            borderLeft: "3px solid #888888",
            marginLeft: "5px",
          }}
        >
          {children}
        </div>
      );
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
export default Element;
