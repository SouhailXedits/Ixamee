import { Input } from '@/components/ui/input';
import React from 'react';
import { updateQuestion } from '../[examenId]/_components/questionSharedFunction';
import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';
import { calcSumOfMarks } from '../[examenId]/_components/sharedFunction';

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
