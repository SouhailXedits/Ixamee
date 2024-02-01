import Image from 'next/image';
import Editor from './toolbar-editor';
import { Input } from '@/components/ui/input';
import { calculerExerciceMark } from './calculateChildrenMarks';
import { cn } from '@/lib/utils';

export const CreateSubSubQuestion = ({ data, setFakeData, isArabic,realExamContetn , allData }: any) => {
  const onChange = (content: string) => {
    console.log(data);
    console.log(content);
    updateContentSubSubQuestion(content, data);
  };
  const updateContentSubSubQuestion = (content: any, data: any) => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any, index: number) => {
                  console.log(subSubItem.mark, '🐳');
                  return {
                    ...subSubItem,
                    children: subSubItem.children.map((subSubSubItem: any) => {
                      if (subSubSubItem.id === data.id) {
                        subSubSubItem.content = content;
                      }
                      return subSubSubItem;
                    }),
                  };
                }),
              };
            }),
          };
        }
        return item;
      });
    });
  };

  function numberToLetters(num: number) {
    let letters = '';
    while (num > 0) {
      let mod = (num - 1) % 26;
      letters = String.fromCharCode(65 + mod) + letters;
      num = Math.floor((num - mod) / 26);
    }
    return letters.toLowerCase();
  }
  const handelDeleteSubSubQuestion = () => {
    // Update the state to include the new sub-sub-question
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any) => {
                  return {
                    ...subSubItem,
                    children: subSubItem.children.filter(
                      (subSubSubItem: any) => subSubSubItem.id !== data.id
                    ),
                  };
                }),
              };
            }),
          };
        }
        return item;
      });
    });
    renderSubSubQuestion();
  };
  const renderSubSubQuestion = () => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any) => {
                  return {
                    ...subSubItem,
                    children: subSubItem.children.map((subSubSubItem: any, index: number) => {
                      subSubSubItem.name = numberToLetters(index + 1);
                      return subSubSubItem;
                    }),
                  };
                }),
              };
            }),
          };
        }
        return item;
      });
    });
  };
  const calcSumOfMarks = (data: any) => {
    let sum = 0;
    data.children.map((item: any) => {
      sum += +item.mark;
    });

    return sum;
  };
  const updateSubSubQuestion = (e: any, data: any) => {
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any, index: number) => {
                  console.log(subSubItem.mark, '🐳');
                  return {
                    ...subSubItem,
                    children: subSubItem.children.map((subSubSubItem: any) => {
                      if (subSubSubItem.id === data.id) {
                        subSubSubItem.mark = +e.target.value;
                      }
                      return subSubSubItem;
                    }),
                  };
                }),
              };
            }),
          };
        }
        return item;
      });
    });
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,

                children: subItem.children.map((subSubItem: any, index: number) => {
                  console.log(subSubItem.mark, '🐳');
                  return {
                    ...subSubItem,
                    mark: calcSumOfMarks(subSubItem),
                  };
                }),
                // mark: calculerExerciceMark(allData),
              };
            }),
            // mark: calculerExerciceMark(allData),
          };
        }
        return item;
      });
    });
    setFakeData((prevData: any) => {
      console.log(prevData);
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question and it has children
        if (item.id === allData.id && item.children.length > 0) {
          // Updating the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Updating the children array of the parent subquestion
              return {
                ...subItem,
                mark: subItem.children.length > 0 ? calcSumOfMarks(subItem) : subItem.mark,
                children: subItem.children.map((subSubItem: any) => {
                  // Returning unchanged subsubitems
                  return {
                    ...subSubItem,
                    mark: calcSumOfMarks(subSubItem),
                  };
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });
    console.log('update');
    console.log(allData);
    calculerExerciceMark(allData);
  };
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
              onChange={onChange}
              initialContent={data?.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[77px] text-xl placeholder:text-mainGreen p-3 border border-[#1B8392]"
              placeholder="--.--"
              type="number"
              defaultValue={data.mark}
              maxLength={5}
              // value={
              //   exercise.children && exercise.children.length > 0
              //     ? calculateSumOfMarks(exercise).toFixed(2)
              //     : exercise.mark
              // }
              onChange={(e) => {
                updateSubSubQuestion(e, data);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={handelDeleteSubSubQuestion}
            />
          </div>
        </div>
      </div>
    </>
  );
};