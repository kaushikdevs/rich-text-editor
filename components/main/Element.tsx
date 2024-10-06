import React from "react";

interface TElement {
  attributes: any;
  children: any;
  element: any;
}

const Element: React.FC<TElement> = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
