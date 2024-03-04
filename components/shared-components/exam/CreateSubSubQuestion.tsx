import Image from 'next/image';
import Editor from './toolbar-editor';
import { Input } from '@/components/ui/input';
// import { calculerExerciceMark, getMarkOfExerciceWithId } from '@a';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { calculerExerciceMark, getMarkOfExerciceWithId } from '@/app/_utils/calculateChildrenMarks';

export const CreateSubSubQuestion = ({
  data,
  setFakeData,
  isArabic,
  realExamContetn,
  allData,
}: any) => {
  const onChange = (content: string) => {
    updateContentSubSubQuestion(content, data);
  };
  // const r

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
    const mark = getMarkOfExerciceWithId(realExamContetn, data.id) as any;

    if (+e.target.value > +mark) {
      // toast.error("la note ne doit pas de passer la note de l'exercice");
      return;
    }
    if (+e.target.value < 0) {
      // toast.error('la note ne doit pas etre inferieur a 0');
      return;
    }
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,

            children: item.children.map((subItem: any) => {
              return {
                ...subItem,

                children: subItem.children.map((subSubItem: any, index: number) => {
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

    calculerExerciceMark(allData);
  };

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
            {/* Adjusted Editor component */}
            <Editor
              // initialContent={data.content}
              editable={false}
              onChange={onChange}
              initialContent={data?.content}
            />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparenta text-center text-[#1B8392] w-[99px] text-xl placeholder:text-mainGreen p-3 border border-[#1B8392]"
              placeholder="--.--"
              type="number"
              step="0.25"
              defaultValue={data.mark}
              maxLength={5}
              value={data.mark || 0}
              onChange={(e) => {
                updateSubSubQuestion(e, data);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
