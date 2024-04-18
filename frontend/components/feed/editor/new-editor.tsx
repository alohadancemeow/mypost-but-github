'use client'

import { BlockNoteEditor, PartialBlock,   } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/style.css";


type Props = {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const NewEditor = ({onChange, editable, initialContent}: Props) => {


    const editor: BlockNoteEditor = useCreateBlockNote({
        // editable: editable,
        initialContent: initialContent
          ? (JSON.parse(initialContent) as PartialBlock[])
          : undefined,
        // onChange: (editor) => {
        //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        // },
      });

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
        <main className="flex-1 h-full overflow-y-auto">
        <div className="pb-40">
        <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <BlockNoteView
          editor={editor}
          editable= {editable}
          onChange={() => 
            onChange(JSON.stringify(editor.blocksToHTMLLossy, null, 2))
          }
        //   theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
      </div>
      </main>
      </div>
    )
}

export default NewEditor