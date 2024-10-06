"use client";
import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createEditor,
  Descendant,
  Range,
  Editor,
  Transforms,
  Text,
} from "slate";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Underline,
  UnderlineIcon,
} from "lucide-react";
import { Slate, Editable, withReact } from "slate-react";
import { slateToHtml } from "@slate-serializers/html";
import { withHistory } from "slate-history";
import Element from "@/components/main/Element";
import Leaf from "@/components/main/Leaf";
import ToolbarButton from "@/components/main/ToolbarButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const initialValue: any = [
  {
    type: "paragraph",
    children: [{ text: "Select this text to see the inline editor!" }],
  },
];

const RichTextEditor = () => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [selection, setSelection] = useState<Range | null>(null);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const toggleFormat = (editor: Editor, format: string) => {
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

  const deserializeHtml = (htmlString: string) => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlString, "text/html");
    const body = parsedHTML.body;
    return Array.from(body.childNodes).map(deserializeElement);
  };

  const deserializeElement = (el: any) => {
    switch (el.nodeName) {
      case "P":
        return { type: "paragraph", children: [{ text: el.textContent }] };
      case "STRONG":
        return { text: el.textContent, bold: true };
      default:
        return { text: el.textContent };
    }
  };

  // Update toolbar position when selection changes
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;

    if (selection && Range.isCollapsed(selection)) {
      el.style.display = "none";
    } else {
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) return;

      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.display = "block";
      el.style.top = `${rect.top + window.scrollY - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  }, [selection]);

  return (
    <div className="p-4 relative">
      <div className="mb-4 space-x-2">
        <ToolbarButton
          format="bold"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Bold className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="italic"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Italic className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="underline"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <UnderlineIcon className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="lineThrough"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Strikethrough className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="code"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Code className="w-5 h-5" color="#000" />
        </ToolbarButton>
      </div>
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => {
          setValue(newValue);
          // Serialize Slate content to HTML
          const html = slateToHtml(newValue);
          console.log("Serialized HTML:", html);
          const serializedToHtml = deserializeHtml(html);
          console.log(serializedToHtml);
          const { selection } = editor;
          setSelection(selection);
        }}
      >
        <Editable
          className="border border-gray-300 p-4 h-screen"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text..."
        />
      </Slate>

      {/* Inline Toolbar */}
      <div
        ref={toolbarRef}
        className="absolute bg-white border border-gray-300 shadow-lg rounded p-2 space-x-2 z-10"
        style={{ display: "none" }}
      >
        <ToolbarButton
          format="bold"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Bold className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="italic"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Italic className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="underline"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <UnderlineIcon className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="lineThrough"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Strikethrough className="w-5 h-5" color="#000" />
        </ToolbarButton>
        <ToolbarButton
          format="code"
          editor={editor}
          toggleFormat={toggleFormat}
          isFormatActive={isFormatActive}
        >
          <Code className="w-5 h-5" color="#000" />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default RichTextEditor;
