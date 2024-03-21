import React from 'react';
import Editor from '@/components/shared-components/toolbar-editor';
import { SubQuestion } from './SubQuestion';
import { QuestionData, SubQuestionData } from './types';

type QuestionProps = {
  data: QuestionData;
  isArabic: boolean;
};

export const Question = ({ data, isArabic }: QuestionProps) => {
  const calculateMark = (data: SubQuestionData[]) =>
    data.reduce((acc: number, item: SubQuestionData) => acc + item.mark, 0);

  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <div className="flex items-center gap-1">
              <span>{data.name} </span>
              <span>)</span>
            </div>
            <Editor
              key={data.content}
              editable={false}
              initialContent={data.content}
              onChange={() => console.log('')}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              disabled
              value={data.children && data.children.length > 0 ? calculateMark(data.children) : data.mark}
            />
          </div>
        </div>
      </div>
      {data.children && data.children.length > 0 && (
        <>
          {data.children.map((item: SubQuestionData) => (
            <SubQuestion key={item.id} data={item} isArabic={isArabic} />
          ))}
        </>
      )}
    </>
  );
};
