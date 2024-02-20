import Image from 'next/image';
import { CreateSubQuestion } from './CreateSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from '../../../../../../../../components/shared-components/toolbar-editor';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { createSubQuestion } from './sharedFunction';
import {
  calculateMark,
  handelDeleteQuestion,
  updateContetn,
  updateQuestion,
} from './questionSharedFunction';

export const CreateQuestion = ({ allData, data, setFakeData, isArabic, fakeData }: any) => {
  return (
    <>
      <div
        className={`relative border  h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className={cn(
            'bg-[#CFE8E6] p-2 rounded-full  cursor-pointer',
            !isArabic ? 'absolute -left-3' : 'absolute -right-3'
          )}
          onClick={() => createSubQuestion(data, setFakeData, allData)}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>

        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <div className="flex items-center gap-1">
              <span>{data.name} </span>
              <span>)</span>
            </div>
            <Editor
              // initialContent={data.content}
              editable={true}
              onChange={(content) => updateContetn(content, data, setFakeData)}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              min={0}
              step="0.25"
              // value={data.mark}
              disabled={data.children && data.children.length > 0}
              // defaultValue={calculerQuestionMark(data)}
              value={data.children && data.children.length > 0 ? calculateMark(data) : data.mark}
              onChange={(e) => {
                updateQuestion(e.target.value, data, setFakeData);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => handelDeleteQuestion(setFakeData, data, allData)}
            />
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <CreateSubQuestion
          key={item.id}
          allData={allData}
          data={item}
          setFakeData={setFakeData}
          isArabic={isArabic}
          fakeData={fakeData}
        />
      ))}
    </>
  );
};
