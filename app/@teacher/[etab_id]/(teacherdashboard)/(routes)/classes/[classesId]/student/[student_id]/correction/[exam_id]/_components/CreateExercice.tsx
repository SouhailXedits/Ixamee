import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CreateQuestion } from './CreateQuestion';
import { cn } from '@/lib/utils';
import { calculateChildrenMarks, calculerExerciceMark } from './calculateChildrenMarks';
import { ChildrenMark, ExerciceData, ExerciceProps } from './types';

export const CreateExercice = ({
  allData,
  data,
  setFakeData,
  realExamContetn,
  isArabic,
}: ExerciceProps) => {
  if (!data) return null;

  const totalMark = calculerExerciceMark(data);

  return (
    <div
      key={data.id}
      className="flex flex-col border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16"
    >
      <div className="flex items-center justify-between w-full p-3">
        <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
          <div className="flex items-center gap-10">
            <Input
              type="text"
              className={cn(
                'text-2xl bg-transparent border-none w-[220px] -mr-10 -ml-1 text-[#1B8392]',
                isArabic && 'pr-[3rem]'
              )}
              defaultValue={data.name}
            />

            <Image
              src="/editeicon.svg"
              width={24}
              height={24}
              alt="Edit icon"
              onClick={() => {}}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 ">
            <div
              className={cn(
                'flex w-[100px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5 '
              )}
            >
              <div className="flex items-center justify-center">
                <Input
                  className={cn(
                    'bg-transparent border-none text-[#1B8392] w-[90px] text-xl  placeholder:text-mainGreen p-3 border border-[#1B8392] text-center'
                
