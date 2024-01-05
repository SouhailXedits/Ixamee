'use client';
import React from 'react';
import Editor from './toolbar-editor';

export default function CreateExam() {
  const onCHange = (conten: string) => {
    console.log(conten);
  };
  return (
    <div>
      <Editor onChange={onCHange} />
    </div>
  );
}
