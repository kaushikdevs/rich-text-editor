import React from "react";

interface TLeaf {
  attributes: any;
  children: any;
  leaf: any;
}

const Leaf: React.FC<TLeaf> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.lineThrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          backgroundColor: "#f4f4f4",
          fontFamily: "monospace",
          padding: "2px",
        }}
      >
        {children}
      </code>
    );
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
