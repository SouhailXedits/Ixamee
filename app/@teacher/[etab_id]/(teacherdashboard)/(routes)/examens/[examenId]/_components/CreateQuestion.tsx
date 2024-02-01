import Image from 'next/image';
import { CreateSubQuestion } from './CreateSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';

export const CreateQuestion = ({ allData, data, setFakeData, isArabic, fakeData }: any) => {
  //  this the content of the Editor 🙄
  const onChange = (content: string) => {
    updateContetn(content, data);
  };
  // Function to create and add a new subquestion to a specific question in fake data
  const createSubQuestion = () => {
    // Generating a new subquestion with a random id, name, initial mark, and an empty children array
    const newSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: `${data.children.length + 1})`, // 🆕 Naming the subquestion based on the current number of children
      mark: 0,
      children: [],
    };

    // Update the state to include the new subquestion
    setFakeData((prevData: any) => {
      // Mapping over the previous data to create a new updatedData array
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question
        if (item.id === allData.id) {
          // Updating the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Checking if the current subitem's id matches the id of the parent subquestion
              if (subItem.id === data.id) {
                // Adding the new subquestion to the children array of the parent subquestion
                return {
                  ...subItem,
                  children: [...subItem.children, newSubQuestion],
                };
              }
              // Returning unchanged subitems
              return subItem;
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });
  };

  // Function to handle deleting a question from fake data
  const handelDeleteQuestion = () => {
    // 🚨 Logging the previous data for debugging purposes
    setFakeData((prevData: any) => {
      console.log(prevData);
      // Mapping over the previous data to create a new updatedData array
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the question to be deleted
        if (item.id === allData.id) {
          // 🗑️ Removing the specific child with the matching id from the children array
          return {
            ...item,
            children: item.children.filter((subItem: any) => subItem.id !== data.id),
          };
        }
        // Returning unchanged items
        return item;
      });
    });
    // 🔄 Triggering a re-render of questions after deletion
    handeRenderQuestion();
  };

  // Function to handle rendering questions and updating their names
  const handeRenderQuestion = () => {
    // 🚨 Logging the previous data for debugging purposes
    setFakeData((prevData: any) => {
      console.log(prevData);
      // Mapping over the previous data to create a new updatedData array
      return prevData.map((item: any) => {
        // Function to get the next character in a sequence based on the index
        const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);

        // Mapping over the children array of each item
        item.children.map((state: any, index: number) => {
          // 🌟 Updating the name of each child with the next character in the sequence
          state.name = getNextChar(index);
        });

        // Returning the updated item
        return item;
      });
    });
  };

  /**
   * Calculate the mark for the given data
   * @param data - The data containing children and mark
   * @returns The calculated mark
   */
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

  return (
    <>
      <div
        className={`relative border flex  h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className={cn(
            'bg-[#CFE8E6] p-2 rounded-full  cursor-pointer',
            !isArabic ? 'absolute -left-3' : 'absolute -right-3'
          )}
          onClick={createSubQuestion}
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
              onChange={onChange}
              initialContent={data.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[77px] text-xl placeholder:text-mainGreen p-3 border border-[#1B8392]"
              placeholder="--.--"
              type="number"
              // value={data.mark}
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              // defaultValue={calculerQuestionMark(data)}
              value={data.children && data.children.length > 0 ? calculateMark(data) : data.mark}
              onChange={(e) => {
                updateQuestion(e.target.value, data);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => handelDeleteQuestion()}
            />
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <CreateSubQuestion
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