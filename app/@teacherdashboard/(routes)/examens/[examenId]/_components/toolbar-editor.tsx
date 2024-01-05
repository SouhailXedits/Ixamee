import React from 'react';
import { useTheme } from 'next-themes';
import { BlockNoteEditor, BlockSchema, BlockType } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor<BlockSchema> = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  // Function to handle checkbox changes
  const handleCheckboxChange = (index: number) => {
    const updatedBlocks = editor.topLevelBlocks.map((block, i) => {
      if (block.type === 'checkbox') {
        return {
          ...block,
          checked: i === index ? !block.checked : block.checked,
        };
      }
      return block;
    });
    editor.onChange(updatedBlocks);
  };

  return (
    <div className="border">
      <BlockNoteView editor={editor} theme="light"></BlockNoteView>

      {/* Render checkboxes */}
      <div>
        {editor.topLevelBlocks.map((block, index) => (
          <div key={index}>
            {block.type === 'checkbox' && (
              <input
                type="checkbox"
                checked={block.checked}
                onChange={() => handleCheckboxChange(index)}
              />
            )}
            {/* Add more block type handling as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
