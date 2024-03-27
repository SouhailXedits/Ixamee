import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CreateQuestion } from './CreateQuestion';
import { cn } from '@/lib/utils';
import {
  calculateChildrenMarks,
  calculerExerciceMark,
  getMarkOfExerciceWithId,
} from '@/app/_utils/calculateChildrenMarks';

export const CreateExercice = ({ allData, data, setFakeData, realExamContetn, isArabic }: any) => {
  if (!data) return;

  return (
    <div
      // key={}
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
              // defaultValue={data.name || !isArabic ? 'Exercice 1' : 'تمرين 1'}
              defaultValue={data.name}
              // value={}
            />

            <Image
              src="/editeicon.svg"
              width={24}
              height={24}
              alt="editicon"
              // onClick={}
              className="cursor-pointer"
            />
          </div>
          {}
          <div className="flex items-center gap-3 ">
            <div
              className={cn(
                'flex w-[100px] pr-[55px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5 ',
                isArabic && 'pr-10'
              )}
            >
              <div className={cn('flex items-center justify-center', isArabic && 'pl-[100px]')}>
                <div
                  className={cn(
                    'w-[160px]  bg-12 h-[54px] flex rounded-lg text-white items-center justify-center text-xl gap-1'
                  )}
                >
                  <span>
                    <span>{Number(calculerExerciceMark(data)).toFixed(2)}</span>
                  </span>
                  <span>/</span>

                  <span>{getMarkOfExerciceWithId(realExamContetn, data.id)?.toFixed(2) || 0}</span>
                </div>
                {/* <Input
                  className={cn(
                    'bg-transparent border-none text-[#1B8392] w-[90px] text-xl  placeholder:text-mainGreen p-3 border border-[#1B8392] text-center'
                  )}
                  placeholder="--.--"
                  maxLength={5}
                  disabled
                  value={Number(calculerExerciceMark(data)).toFixed(2)}
                  // defaultValue={}
                /> */}
                {/* <span className="text-xl">/ 20.00</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 ml-10">
        <div className="flex flex-col gap-4 ">
          {/* {isArabic && (
            <span className="pr-10 -mb-4 text-xl pt-2 text-[#D9D9D9]">اكتب النص هنا</span>
          )} */}
          {data.children.map((item: any) => (
            <CreateQuestion
              key={item.id}
              data={item}
              allData={data}
              fakeData={allData}
              isArabic={isArabic}
              realExamContetn={realExamContetn}
              setFakeData={setFakeData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
