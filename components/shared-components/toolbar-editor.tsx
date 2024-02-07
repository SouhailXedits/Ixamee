'use client';

import { useTheme } from 'next-themes';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  placeholder?: string;
}

const Editor = ({ onChange, initialContent, editable, placeholder }: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    
    // styleSpecs: {
    //   'p': {
    //     margin: '0',
    //   },
    // },
    // placeholder: placeholder || 'Ecrivez quelque chose...',
  
  });

  return (
    <div className="w-full">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}

      />
    </div>
  );
};

export default Editor;
