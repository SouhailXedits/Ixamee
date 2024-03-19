import { Input } from '@/components/ui/input';
import React from 'react';

import { calcSumOfMarks, updateSubQuestion } from '../../[examenId]/_components/sharedFunction';

export default function RenderQuestion({ child, content, setContent }: any) {
  const handelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSubQuestion(e, child, setContent, content);
  };
  const handelCalculation = (child: any) => {
    const mark = calcSumOfMarks(child);
    return mark;
  };

  return (
    <div className="flex items-center gap-3 ">
      <div className="text-[#4C4C4D]"> {child?.name} </div>
      <div>
        {' '}
        {child.children && child.children.length > 0 ? (
          <Input
            className="w-[71px] text-black rounded-xl h-[40px] bg-[#D5E9EF] items-center [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]  pb-10"
            type="number"
            step={0.25}
            min={0}
            disabled={true}
            value={handelCalculation(child)}
          />
        ) : (
          <Input
            className="w-[71px] text-black rounded-xl h-[40px] bg-[#D5E9EF] items-center [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]  pb-10"
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
