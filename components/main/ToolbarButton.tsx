import { Editor } from "slate";
import React from "react";

const getButtonClass = (
  editor: Editor,
  format: string,
  isFormatActive: any
) => {
  return isFormatActive(editor, format) ? "bg-blue-100" : "";
};

interface TToolbarButton {
  format: string;
  editor: Editor;
  children: React.ReactNode;
  isFormatActive: any;
  toggleFormat: Function;
}

const ToolbarButton: React.FC<TToolbarButton> = ({
  format,
  editor,
  children,
  isFormatActive,
  toggleFormat,
}) => {
  const buttonClass = getButtonClass(editor, format, isFormatActive);
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
      className={`px-2 py-1 rounded ${buttonClass}`}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
