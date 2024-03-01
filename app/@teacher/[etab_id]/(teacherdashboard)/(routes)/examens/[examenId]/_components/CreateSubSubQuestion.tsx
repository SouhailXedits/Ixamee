import Image from 'next/image';
import Editor from '../../../../../../../../components/shared-components/toolbar-editor';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { calculerExerciceMark } from '@/app/_utils/calculateChildrenMarks';
import toast from 'react-hot-toast';
import {
  handelDeleteSubSubQuestion,
  updateContentSubSubQuestion,
  updateSubSubQuestion,
} from './subsubQuestionSharedFunction';

export const CreateSubSubQuestion = ({ data, setFakeData, isArabic, allData }: any) => {
  return (
    <>
      <div
        className={cn(
          `relative border flex h-auto min-h-[79px] mr-3  rounded-xl flex items-center justify-start`,
          !isArabic ? 'ml-[12rem]' : ' mr-[12rem] '
        )}
      >
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data?.name}</span>
            {/* Adjusted Editor component */}
            <Editor
              // initialContent={data.content}
              editable={true}
              onChange={(content) =>
                updateContentSubSubQuestion(content, data, setFakeData, allData)
              }
              initialContent={data?.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 text-center border border-[#1B8392]"
              type="number"
              min={0}
              step="0.25"
              placeholder="--.--"
              defaultValue={data?.mark}
              value={data?.mark}
              onChange={(e) => {
                if (+e.target.value <= 0) {
                  // toast.error('la note ne doit pas etre inferieur a 0');
                  return;
                }
                updateSubSubQuestion(e, data, setFakeData, allData);
                // }
              }}
              onWheel={(event) => event.currentTarget.blur()}
            />
            {/* <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              min={0}
              defaultValue={data.mark}
              step="0.25"
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              // value={
              //   exercise.children && exercise.children.length > 0
              //     ? calculateSumOfMarks(exercise).toFixed(2)
              //     : exercise.mark
              // }
              value={data.mark !== 0 && data.mark}
              onChange={(e: any) => {
                if (e.target.value <= 0) {
                  toast.error('la note ne doit pas etre inferieur a 0');
                  return;
                }
                updateSubQuestion(e, data);
              }}
            /> */}
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => handelDeleteSubSubQuestion(setFakeData, data, allData)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
