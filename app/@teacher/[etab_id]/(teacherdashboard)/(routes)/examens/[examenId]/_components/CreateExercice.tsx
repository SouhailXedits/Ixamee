import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CreateQuestion } from './CreateQuestion';
import { cn } from '@/lib/utils';
import { calculerExerciceMark } from '@/app/_utils/calculateChildrenMarks';

export const CreateExercice = ({ allData, data, setFakeData, isArabic }: any) => {
  if (!data) return;

  // // const isArabic = language === 'ar';
  // const isArabic = false;
  const AddQuestion = () => {
    setFakeData((prevData: any) => {
      const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

      const newData = {
        id: Math.random().toString(36).substring(7),
        name: getNextChar(data.children.length),
        mark: 1,
        content: '',
        children: [],
      };

      const updatedData = prevData.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, children: [...item.children, newData] };
        }
        return item;
      });

      return updatedData;
    });
  };
  const deleteExercice = (data: any) => {
    const newData = allData.filter((item: any) => item.id !== data.id);
    setFakeData(newData);
  };

  //   calculateChildrenMarks(allData);  console.log(allData)
  const hndelChangeExcericeName = (e: any) => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, name: e.target.value };
        }
        return item;
      });
    });
  };

  return (
    <div
      // key={}
      className="flex flex-col border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16"
    >
      <div className="flex items-center justify-between w-full p-3">
        <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
          <div className="flex items-center gap-8">
            <Input
              type="text"
              className={cn(
                'text-2xl bg-transparent border-none -mr-10 -ml-1 text-[#1B8392]',
                isArabic && 'pr-[3rem]'
              )}
              // defaultValue={data.name || !isArabic ? 'Exercice 1' : 'تمرين 1'}
              // defaultValue={data.name}
              value={data.name}
              onChange={(e) => hndelChangeExcericeName(e)}
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
                'flex w-[100px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5 '
              )}
            >
              <div className="flex items-center justify-center">
                <Input
                  className={cn(
                    'bg-transparent border-none text-[#1B8392] w-[90px] text-xl  placeholder:text-mainGreen p-3 border border-[#1B8392] text-center'
                  )}
                  placeholder="--.--"
                  maxLength={5}
                  disabled
                  value={Number(calculerExerciceMark(data)).toFixed(2)}
                  // defaultValue={}
                />
                {/* <span className="text-xl">/ 20.00</span> */}
              </div>
            </div>

            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => deleteExercice(data)}
            />
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
              setFakeData={setFakeData}
            />
          ))}
        </div>
        <div className="px-4 pt-4 -mb-10">
          <div
            className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer justify-center  "
            onClick={() => AddQuestion()}
          >
            <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
            {!isArabic ? 'Ajoutez une question' : 'إضافة سؤال'}
          </div>
        </div>
      </div>
    </div>
  );
};
