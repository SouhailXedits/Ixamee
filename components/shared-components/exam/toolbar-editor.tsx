'use client';

import { useTheme } from 'next-themes';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import { uploadToTmpFilesDotOrg_DEV_ONLY } from '@blocknote/core';
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

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div className="w-full">
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </div>
  );
};

export default Editor;
