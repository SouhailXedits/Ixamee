import { Input } from '@/components/ui/input';
import React from 'react';

import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';

import { updateQuestion } from '../../[examenId]/_components/questionSharedFunction';
import { calcSumOfMarks } from '../../[examenId]/_components/sharedFunction';

export default function RenderExercice({ child, content, setContent }: any) {
  const handelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 0) {
      return;
    }
    updateQuestion(e.target.value, child, setContent);
  };
  const handelCalculation = (child: any) => {
    const mark = calcSumOfMarks(child);

    return mark;
  };
  return (
    <div className="flex items-center gap-3 ">
      <div className="text-[#4C4C4D]"> {child?.name} )</div>
      <div>
        {' '}
        {child.children && child.children.length > 0 ? (
          <span className="w-[71px] text-[#727272] rounded-xl h-[40px] bg-[#D5E9EF]  [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]  opacity-50 flex items-center jus-center pl-5">
            {handelCalculation(child)}
          </span>
        ) : (
          <span className="w-[71px] text-[#727272] rounded-xl h-[40px] bg-[#D5E9EF]  [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]   flex items-center jus-center pl-5">
            {(child?.mark).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
