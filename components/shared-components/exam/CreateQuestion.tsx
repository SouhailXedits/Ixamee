import Image from 'next/image';
import { CreateSubQuestion } from './CreateSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';
import { getMarkOfExerciceWithId } from '@/app/_utils/calculateChildrenMarks';
import toast from 'react-hot-toast';

export const CreateQuestion = ({
  allData,
  data,
  setFakeData,
  realExamContetn,
  isArabic,
  fakeData,
}: any) => {
  console.log(allData, 'allData');
  console.log(data, 'data');
  const onChange = (content: string) => {
    updateContetn(content, data);
  };
  const calculateMark = (data: any) => {
    // If data has no children, default to an empty array
    const children = data?.children || [];

    // Calculate the mark by summing up the marks of the children
    data.mark = children?.reduce((acc: number, item: any) => {
      return acc + item.mark;
    }, 0);

    // Return the calculated mark
    return data.mark;
  };
  const updateContetn = (contetn: string, data: any) => {
    // Using setFakeData to update the state based on previous data
    setFakeData((prevData: any) => {
      // Mapping over the previous data to create a new updatedData array
      const updatedData = prevData.map((item: any) => {
        // Mapping over the children array of each item
        item.children.map((state: any, index: number) => {
          // Checking if the current child's id matches the provided data's id
          if (state.id === data.id) {
            // Updating the mark of the matching child with the new value (+e)
            state.content = contetn;
          }
        });
        // Returning the updated item
        return item;
      });
      // Returning the updatedData to setFakeData
      return updatedData;
    });
  };

  // Function to update a question's mark in the fake data
  const updateQuestion = (e: any, data: any) => {
    const mark = getMarkOfExerciceWithId(realExamContetn, data.id) as any;
    if (+e > +mark) {
      // toast.error("la note ne doit pas de passer la note de l'exercice");
      return;
    }
    if (+e < 0) {
      // toast.error('la note ne doit pas etre inferieur a 0');
      return;
    }
    // Using setFakeData to update the state based on previous data
    setFakeData((prevData: any) => {
      // Mapping over the previous data to create a new updatedData array
      const updatedData = prevData.map((item: any) => {
        // Mapping over the children array of each item
        item.children.map((state: any, index: number) => {
          // Checking if the current child's id matches the provided data's id
          if (state.id === data.id) {
            // Updating the mark of the matching child with the new value (+e)
            state.mark = +e;
          }
        });
        // Returning the updated item
        return item;
      });
      // Returning the updatedData to setFakeData
      return updatedData;
    });
  };
  console.log(data)

  return (
    <>
      <div
        className={`relative border flex  h-auto min-h-[79px] mr-3 rounded-xl items-center justify-start`}
      >
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <div className="flex items-center gap-1">
              <span>{data.name} </span>
              <span>)</span>
            </div>
            <Editor
              // initialContent={data.content}
              editable={false}
              onChange={onChange}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            {data.children && data.children.length > 0 ? (
              <div className="w-[160px] bg-12 h-[54px] flex rounded-lg text-white items-center justify-center text-xl gap-1">
                <span>{calculateMark(data).toFixed(2)}</span>

                <span>/</span>
                <span>{getMarkOfExerciceWithId(realExamContetn, data.id)?.toFixed(2)}</span>
              </div>
            ) : (
              <Input
                className="bg-transparent a text-[#1B8392] w-[90px] text-xl placeholder:text-mainGreen text-center p-3 border border-[#1B8392]"
                type="number"
                placeholder={'--.--'}
                // value={data.mark}
                step="0.25"
                disabled={data.children && data.children.length > 0}
                value={data.mark || 0}
                // max={10}
                onChange={(e) => {
                  updateQuestion(e.target.value, data);
                }}
              />
            )}
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
          realExamContetn={realExamContetn}
          fakeData={fakeData}
        />
      ))}
    </>
  );
};
