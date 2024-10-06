import { createEditor, Editor, Text, Transforms } from "slate";
import ToolbarButton from "./ToolbarButton";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import React, { useMemo } from "react";

const Toolbar: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const toggleFormat = (editor: Editor, format: string) => {
    alert(format);

    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const isFormatActive = (editor: Editor, format: string) => {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n[format] === true,
      universal: true,
    });
    return !!match;
  };

  return (
    <div className="mb-4 space-x-2">
      <ToolbarButton
        format="bold"
        editor={editor}
        toggleFormat={toggleFormat}
        isFormatActive={isFormatActive}
      >
        Bold
      </ToolbarButton>
      <ToolbarButton
        format="italic"
        editor={editor}
        toggleFormat={toggleFormat}
        isFormatActive={isFormatActive}
      >
        Italic
      </ToolbarButton>
      <ToolbarButton
        format="underline"
        editor={editor}
        toggleFormat={toggleFormat}
        isFormatActive={isFormatActive}
      >
        Underline
      </ToolbarButton>
      <ToolbarButton
        format="lineThrough"
        editor={editor}
        toggleFormat={toggleFormat}
        isFormatActive={isFormatActive}
      >
        Line-through
      </ToolbarButton>
      <ToolbarButton
        format="code"
        editor={editor}
        toggleFormat={toggleFormat}
        isFormatActive={isFormatActive}
      >
        Code
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
