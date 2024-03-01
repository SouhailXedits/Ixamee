'use client';
import { v4 as uuidv4 } from 'uuid';

import { useTheme } from 'next-themes';
import {
  BlockNoteEditor,
} from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

import Image from 'next/image';
import { useState } from 'react';
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const handleUpload = async (file: File) => {
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', 'firaslatrach');

  const response = await fetch('https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload', {
    method: 'post',
    body: form,
  });

  if (response.ok) {
    const data = await response.json();
    return data.url;
  }
};
const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const [file, SetFile] = useState('');
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file' && item.type.includes('image')) {
        const file = item.getAsFile();
        if (!file) continue;

        const selection = editor.getTextCursorPosition();
        const id = uuidv4();
        const fakeImageUrl = URL.createObjectURL(file);

        if (fakeImageUrl) {
          // If imageUrl is available, insert the image block with the correct URL
          const imageBlock: any = {
            id: id,
            type: 'image',
            props: {
              url: fakeImageUrl,
              caption: '',
              width: 512,
            },
            content: [],
            children: [],
          };
          editor.insertBlocks([imageBlock], selection.block.id, 'before');
        }
        const imageUrl = await handleUpload(file);
        if (imageUrl) {
          const imageBlock: any = {
            id: id,
            type: 'image',
            props: {
              url: imageUrl,
              caption: '',
              width: 512,
            },
            content: [],
            children: [],
          };
          editor.updateBlock(id, imageBlock);
        }
      }
    }
  };

  return (
    <div className="w-full h-full" onPaste={(e) => handlePaste(e)}>
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    
    </div>
  );
};

export default Editor;
