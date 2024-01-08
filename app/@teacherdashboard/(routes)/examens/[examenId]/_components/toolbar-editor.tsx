import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({ onChange, initialContent, editable }: EditorProps) => {
  // Get the current theme using Next.js theme hook
  const { resolvedTheme } = useTheme();
  const [equation, setEquation] = useState('y=x');
  // Initialize BlockNoteEditor using useBlockNote hook
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div className=" w-full tex-black">
      <BlockNoteView editor={editor} theme="light"></BlockNoteView>
    </div>
  );
};

export default Editor;
