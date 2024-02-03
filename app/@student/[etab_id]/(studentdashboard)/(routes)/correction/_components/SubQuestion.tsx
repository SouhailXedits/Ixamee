import { SubSubQuestion } from './SubSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from '@/components/shared-components/toolbar-editor';
import { cn } from '@/lib/utils';

export const SubQuestion = ({ data, isArabic }: any) => {

  return (
    <>
      <div
        className={cn(
          `relative border h-auto min-h-[79px] mr-3  rounded-xl flex items-center justify-start`,
          !isArabic ? 'ml-[6rem]' : 'mr-[6rem]'
        )}
      >
        
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data.name}</span>
            <Editor
              editable={false}
              onChange={() => console.log('changed')}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen p-3 border text-center border-[#1B8392]"
              placeholder="--.--"
              type="number"
              defaultValue={data.mark}
              maxLength={5}
              disabled
              value={data.mark !== 0 && data.mark}

            />
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <SubSubQuestion
          key={item.id}
          data={item}
          isArabic={isArabic}
        />
      ))}
    </>
  );
};
