import Image from 'next/image';
import Editor from '@/components/shared-components/toolbar-editor';
import { Input } from '@/components/ui/input';
import { calculerExerciceMark } from '../../../../../../_utils/calculateChildrenMarks';
import { cn } from '@/lib/utils';

export const SubSubQuestion = ({ data, isArabic }: any) => {
  return (
    <>
      <div
        className={cn(
          `relative border h-auto min-h-[79px] mr-3  rounded-xl flex items-center justify-start`,
          !isArabic ? 'ml-[12rem]' : ' mr-[12rem] '
        )}
      >
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data?.name}</span>

            <Editor
              editable={false}

              initialContent={data?.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 text-center border border-[#1B8392]"
              type="number"
              placeholder="--.--"
              defaultValue={data.mark}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};
