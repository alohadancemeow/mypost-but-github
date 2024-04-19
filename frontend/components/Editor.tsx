"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { ChangeEvent, useCallback, useEffect } from "react";

type Props = {
  onChange: (editor: BlockNoteEditor) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, editable, initialContent }: Props) => {
  const editor: BlockNoteEditor = useCreateBlockNote({});

  // const markdownInputChanged = useCallback(
  //   async (e: ChangeEvent<HTMLTextAreaElement>) => {
  //     // Whenever the current Markdown content changes, converts it to an array of
  //     // Block objects and replaces the editor's content with them.
  //     const blocks = await editor.tryParseMarkdownToBlocks(e.target.value);
  //     editor.replaceBlocks(editor.document, blocks);
  //   },
  //   [editor]
  // );

  /**
   * For initialization; on mount, convert the initial Markdown to blocks
   * and replace the default editor's content
   */
  useEffect(() => {
    async function loadInitialHTML() {
      if (!initialContent) return null;

      const blocks = await editor.tryParseHTMLToBlocks(initialContent);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor]);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => onChange(editor)}
      />
    </div>
  );
};

export default Editor;
