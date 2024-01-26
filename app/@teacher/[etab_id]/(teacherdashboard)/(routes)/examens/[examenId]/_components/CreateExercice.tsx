import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CreateQuestion } from "./CreateQuestion";
import { cn } from "@/lib/utils";

export const CreateExercice = ({ allData, data, setFakeData }: any) => {
  if (!data) return;
  const language = data?.language;
  // const isArabic = language === 'ar';
  const isArabic = false;
  const AddQuestion = () => {
    setFakeData((prevData: any) => {
      const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

      const newData = {
        id: Math.random().toString(36).substring(7),
        name: getNextChar(data.children.length),
        mark: 0,
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
    console.log(data);
    const newData = allData.filter((item: any) => item.id !== data.id);
    setFakeData(newData);
  };
  const calculerExerciceMark = () => {
    data.mark = data.children.reduce((acc: number, item: any) => {
      return acc + item.mark;
    }, 0);
    return data.mark;
  };

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
                isArabic && 'pr-14'
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
            {isArabic ? (
              <div
                className={cn(
                  'flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5 '
                )}
              >
                <div className={cn('flex text-center text-[#1B8392] leading-tight items-center')}>
                  <span className="text-xl"> 20.00/</span>

                  <Input
                    className={cn(
                      'bg-transparent border-none text-[#1B8392] w-[90px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]'
                    )}
                    placeholder="--.--"
                    maxLength={5}
                    disabled
                    // value={updateExericeMark}
                    // value={}
                    // defaultValue={}
                  />
                </div>
              </div>
            ) : (
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
                    // value={Number(calculerExerciceMark(allData, data)).toFixed(2)}
                    // defaultValue={}
                  />
                  {/* <span className="text-xl">/ 20.00</span> */}
                </div>
              </div>
            )}

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
              data={item}
              allData={data}
              fakeData={allData}
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
            {language === 'fr' ? 'Ajoutez une question' : 'إضافة سؤال'}
          </div>
        </div>
      </div>
    </div>
  );
};
