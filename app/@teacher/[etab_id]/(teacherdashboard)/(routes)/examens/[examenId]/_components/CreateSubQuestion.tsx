import Image from 'next/image';
import { CreateSubSubQuestion } from './CreateSubSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from '../../../../../../../../components/shared-components/toolbar-editor';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  calcSumOfMarks,
  handleDeleteSubQuestion,
  renderSubSubQuestion,
  updateSubQuestion,
} from './sharedFunction';
import { createSubSubQuestion, updateContentSubQuestion } from './subQuestionSharedFunction';

export const CreateSubQuestion = ({ allData, data, setFakeData, isArabic, fakeData }: any) => {
  return (
    <>
      <div
        className={cn(
          `relative border  h-auto min-h-[79px] mr-3  rounded-xl flex items-center justify-start`,
          !isArabic ? 'ml-[6rem]' : 'mr-[6rem]'
        )}
      >
        <div
          className={cn(
            'bg-[#CFE8E6] p-2 rounded-full absolute  cursor-pointer',
            !isArabic ? '-left-3' : '-right-3'
          )}
          onClick={() => createSubSubQuestion(isArabic, data, setFakeData, allData)}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data.name}</span>
            {/* Adjusted Editor component */}
            <Editor
              // initialContent={data.content}
              editable={true}
              onChange={(content) => updateContentSubQuestion(content, data, setFakeData, allData)}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              min={0}
              defaultValue={data.mark}
              step="0.25"
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              value={data.children && data.children.length > 0 ? calcSumOfMarks(data) : data.mark}
              onChange={(e: any) => {
                if (e.target.value <= 0) {
                  // toast.error('la note ne doit pas etre inferieur a 0');
                  return;
                }

                updateSubQuestion(e, data, setFakeData, allData);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => {
                handleDeleteSubQuestion(setFakeData, data, allData);
              }}
            />
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <CreateSubSubQuestion
          key={item.id}
          data={item}
          setFakeData={setFakeData}
          isArabic={isArabic}
          allData={allData}
        />
      ))}
    </>
  );
};
