import Image from 'next/image';
import { CreateSubSubQuestion } from './CreateSubSubQuestion';
import { Input } from '@/components/ui/input';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { getMarkOfExerciceWithId } from '@/app/_utils/calculateChildrenMarks';

export const CreateSubQuestion = ({
  allData,
  data,
  setFakeData,
  isArabic,
  realExamContetn,
  fakeData,
}: any) => {
  const onChange = (content: string) => {
    updateContentSubQuestion(content, data);
  };
  const updateContentSubQuestion = (contetn: any, data: any) => {
    // Updating the mark of the specific subquestion
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question
        if (item.id === allData.id) {
          // Updating 👍 the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Updating the children array of the parent subquestion
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any) => {
                  // Checking if the current subsubitem's id matches the id of the subquestion to be updated
                  if (subSubItem.id === data.id) {
                    // Updating the mark of the subquestion with the new value
                    subSubItem.content = contetn;
                  }
                  // Returning unchanged subsubitems
                  return subSubItem;
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });

    // Recalculating marks in the hierarchy
  };

  const createSubSubQuestion = () => {
    const getNextName = (currentName: string) => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const base = alphabet.length;

      let result = '';
      let carry = 1;

      for (let i = currentName.length - 1; i >= 0; i--) {
        const char = currentName[i];
        const charIndex = alphabet.indexOf(char);
        const sum = charIndex + carry;

        result = alphabet[sum % base] + result;
        carry = Math.floor(sum / base);

        if (carry === 0) {
          result = currentName.substring(0, i) + result;
          break;
        }
      }
      if (carry > 0) {
        result = alphabet[carry % base] + result;
        if (carry > base) {
          result = 'a' + result; // Overflow, add an extra 'a'
        }
      }
      return result;
    };
    const lastSubSubQuestion = data.children[data.children.length - 1];

    const nextName = lastSubSubQuestion ? getNextName(lastSubSubQuestion.name) : 'a';

    const newSubSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: nextName,
      mark: 0,
      children: [],
    };

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
                  if (subSubItem.id === data.id) {
                    return {
                      ...subSubItem,
                      children: [...subSubItem.children, newSubSubQuestion],
                    };
                  }
                  return subSubItem;
                }),
              };
            }),
          };
        }
        return item;
      });
    });
  };
  // function handelDeletsubQuestion(data: any) {
  //   setFakeData((prevData: any) => {
  //     return prevData.map((item: any) => {
  //
  //       if (item.id === allData.id) {
  //         item.children.map((subItem: any) => {
  //
  //           subItem.children.map((subSubItem: any) => {
  //             if (subSubItem.id === data.id) {
  //
  //               return {
  //                 ...item,
  //                 children: item.children.filter((subItem: any) => subItem.id !== data.id),
  //               };
  //             }
  //           });
  //         });
  //       }
  //       return item;
  //     });
  //   });
  // }
  // [
  //   {
  //     id: 'rqw4pu',
  //     name: 'Exercice 1',
  //     mark: 10,
  //     children: [
  //       {
  //         id: 'xmsjs',
  //         name: 'Ⅰ',
  //         mark: 10,
  //         children: [{ id: 'neylcb', name: '1)', mark: 10, children: [] }],
  //       },
  //     ],
  //   },
  // ];

  // Function to handle deleting a sub-subquestion
  const handleDeleteSubQuestion = () => {
    // Updating the state to delete the specified sub-subquestion
    setFakeData((prevData: any) => {
      // Mapping over the previous data to create a new updatedData array
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question
        if (item.id === allData.id) {
          // Updating the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Updating the children array of the parent subquestion
              return {
                ...subItem,
                children: subItem.children.filter((subSubItem: any) => {
                  // Checking if the current subsubitem's id matches the id of the sub-subquestion to be deleted
                  if (subSubItem.id === data.id) {
                    // 🗑️ Returning false to exclude the sub-subquestion from the children array
                    return false;
                  }
                  // Returning true to keep other sub-subquestions in the children array
                  return true;
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });

    // Re-rendering sub-subquestions after deletion
    renderSubSubQuestion();
  };

  // Function to render and update names of sub-subquestions
  const renderSubSubQuestion = () => {
    // Updating the state to render and update sub-subquestions
    setFakeData((prevData: any) => {
      // Mapping over the previous data to create a new updatedData array
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question
        if (item.id === allData.id) {
          // Updating the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Updating the children array of the parent subquestion
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any, index: number) => {
                  // 🆕 Updating the name of each sub-subquestion based on its index
                  subSubItem.name = index + 1 + ')';
                  // Returning unchanged sub-subitems
                  return subSubItem;
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });
  };

  // Function to calculate the sum of marks in a subquestion hierarchy
  const calculerSubMark = (data: any) => {
    // Extracting children from the provided data
    const children = data.children;

    // Logging children, data, and allData for debugging purposes

    // Initializing the sum variable to 0
    let sum = 0;

    // Uncomment the following line if you intend to reset the mark of the provided data to 0
    // data.mark = 0;

    // Returning the calculated sum (which is currently 0)
    return sum;
  };

  // Function to calculate the sum of marks in a subquestion hierarchy
  const calcSumOfMarks = (data: any) => {
    // Logging the data for debugging purposes

    // Initializing the sum variable to 0
    let sum = 0;

    // Mapping over the children array of the provided data
    data.children.map((item: any) => {
      // Adding the mark of each child to the sum
      sum += +item.mark;
    });

    // Returning the calculated sum
    return sum;
  };

  // Function to update the mark of a subquestion and recalculate the marks in the hierarchy

  const updateSubQuestion = (e: any, data: any) => {
    const mark = getMarkOfExerciceWithId(realExamContetn, data.id) as any;
    if (+e.target.value > +mark) {
      // toast.error("la note ne doit pas de passer la note de l'exercice");
      return;
    }
    if (+e.target.value < 0) {
      // toast.error('la note ne doit pas etre inferieur a 0');
      return;
    }

    // Updating the mark of the specific subquestion
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        // Checking if the current item's id matches the id of the parent question
        if (item.id === allData.id) {
          // Updating 👍 the children array of the parent question
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              // Updating the children array of the parent subquestion
              return {
                ...subItem,
                children: subItem.children.map((subSubItem: any) => {
                  // Checking if the current subsubitem's id matches the id of the subquestion to be updated
                  if (subSubItem.id === data.id) {
                    // Updating the mark of the subquestion with the new value
                    subSubItem.mark = +e.target.value;
                  }
                  // Returning unchanged subsubitems
                  return subSubItem;
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });

    // Recalculating marks in the hierarchy
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
                  return subSubItem;
                }),
              };
            }),
          };
        }
        // Returning unchanged items
        return item;
      });
    });
  };

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
            {/* Adjusted Editor component */}
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
                <span>
                  <span>{data.mark === null ? '0.00' : data.mark}</span>
                </span>
                <span>/</span>
                <span>{getMarkOfExerciceWithId(realExamContetn, data.id)?.toFixed(2)}</span>
              </div>
            ) : (
              <Input
                className="bg-transparent a text-[#1B8392] w-[100px] text-xl placeholder:text-mainGreen flex items-center justify-center p-3 border border-[#1B8392] text-center"
                // placeholder={`${getMarkOfExerciceWithId(realExamContetn, data.id)}`}
                type="number"
                defaultValue={data.mark}
                step="0.25"
                maxLength={5}
                disabled={data.children && data.children.length > 0}
                value={data.mark || 0}
                onChange={(e: any) => {
                  updateSubQuestion(e, data);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <CreateSubSubQuestion
          key={item.id}
          data={item}
          setFakeData={setFakeData}
          isArabic={isArabic}
          realExamContetn={realExamContetn}
          allData={allData}
        />
      ))}
    </>
  );
};
