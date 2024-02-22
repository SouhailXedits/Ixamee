import { Input } from '@/components/ui/input';
import React from 'react';
import { calcSumOfMarks } from '../[examenId]/_components/sharedFunction';
import { updateSubSubQuestion } from '../[examenId]/_components/subsubQuestionSharedFunction';

export default function RenderSubQuestion({ child, content, setContent }: any) {
  console.log(child);
  const handelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    updateSubSubQuestion(e, child, setContent, content);
  };
  const handelCalculation = (child: any) => {
    const mark = calcSumOfMarks(child);

    return mark;
  };
  return (
    <div className="flex items-center gap-3 ">
      <div className="text-[#4c4c4dd9]"> {child?.name} )</div>
      <div>
        {' '}
        {child.children && child.children.length > 0 ? (
          <Input
            className="w-[59px] text-[#727272] rounded-xl h-[30px] bg-4 items-center [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] "
            type="number"
            step={0.25}
            min={0}
            disabled={true}
            value={handelCalculation(child)}
          />
        ) : (
          <Input
            className="w-[59px] text-[#727272] rounded-xl h-[30px] bg-4 items-center [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] "
            type="number"
            step={0.25}
            min={0}
            value={(child?.mark).toFixed(2)}
            onChange={(e) => {
              handelUpdate(e);
            }}
          />
        )}
      </div>
    </div>
  );
}
