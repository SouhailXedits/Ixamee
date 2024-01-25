'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { useState } from 'react';

export const CreateSubSubQuestion = ({ data, setFakeData, allData }: any) => {

  const onChange = (content: string) => {
    console.log(content);
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
    console.log(data);
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
              };
            }),
          };
        }
        return item;
      });
    });
    console.log('update');
    console.log(allData);
  };
  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 ml-[12rem] rounded-xl flex items-center justify-start`}
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
              // defaultValue={}
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
export const CreateSubQuestion = ({ allData, data, setFakeData, fakeData }: any) => {
  const onChange = (content: string) => {
    console.log(content);
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
  //       console.log(item);
  //       if (item.id === allData.id) {
  //         item.children.map((subItem: any) => {
  //           console.log(subItem);
  //           subItem.children.map((subSubItem: any) => {
  //             if (subSubItem.id === data.id) {
  //               console.log(subSubItem);
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
    console.log(children);
    console.log(data);
    console.log(allData);

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
    console.log(data);

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
    console.log(data);

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

  console.log(allData);
  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 ml-[6rem] rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 cursor-pointer"
          onClick={createSubSubQuestion}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data.name}</span>
            {/* Adjusted Editor component */}
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
              defaultValue={data.mark}
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              // value={
              //   exercise.children && exercise.children.length > 0
              //     ? calculateSumOfMarks(exercise).toFixed(2)
              //     : exercise.mark
              // }
              value={data.mark}
              onChange={(e) => {
                updateSubQuestion(e, data);
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => {
                handleDeleteSubQuestion();
              }}
            />
          </div>
        </div>
      </div>
      {data.children.map((item: any) => (
        <CreateSubSubQuestion data={item} setFakeData={setFakeData} allData={allData} />
      ))}
    </>
  );
};
export const CreateQuestion = ({ allData, data, setFakeData, fakeData }: any) => {
  //  this the content of the Editor 🙄
  const onChange = (content: string) => {
    console.log(content);
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

  console.log(fakeData);
  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 cursor-pointer"
          onClick={createSubQuestion}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{data.name} </span> ){/* Adjusted Editor component */}
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
          fakeData={fakeData}
        />
      ))}
    </>
  );
};

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

function CreateExam({ data }: any) {
  const [fakeData, setFakeData] = useState<any>([
    {
      name: 'Exerice n1',
      mark: 10,
      id: '1x23ds',
      children: [
        {
          name: 'I)',
          mark: '10',
          content:
            '[\n' +
            '  {\n' +
            '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
            '    "type": "paragraph",\n' +
            '    "props": {\n' +
            '      "textColor": "default",\n' +
            '      "backgroundColor": "default",\n' +
            '      "textAlignment": "left"\n' +
            '    },\n' +
            '    "content": [\n' +
            '      {\n' +
            '        "type": "text",\n' +
            '        "text": "what is 1+1",\n' +
            '        "styles": {}\n' +
            '      }\n' +
            '    ],\n' +
            '    "children": []\n' +
            '  },\n' +
            '  {\n' +
            '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
            '    "type": "paragraph",\n' +
            '    "props": {\n' +
            '      "textColor": "default",\n' +
            '      "backgroundColor": "default",\n' +
            '      "textAlignment": "left"\n' +
            '    },\n' +
            '    "content": [],\n' +
            '    "children": []\n' +
            '  }\n' +
            ']',
          children: [
            {
              name: '1)',
              mark: '2',
              content:
                '[\n' +
                '  {\n' +
                '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
                '    "type": "paragraph",\n' +
                '    "props": {\n' +
                '      "textColor": "default",\n' +
                '      "backgroundColor": "default",\n' +
                '      "textAlignment": "left"\n' +
                '    },\n' +
                '    "content": [\n' +
                '      {\n' +
                '        "type": "text",\n' +
                '        "text": "what is 1+1",\n' +
                '        "styles": {}\n' +
                '      }\n' +
                '    ],\n' +
                '    "children": []\n' +
                '  },\n' +
                '  {\n' +
                '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
                '    "type": "paragraph",\n' +
                '    "props": {\n' +
                '      "textColor": "default",\n' +
                '      "backgroundColor": "default",\n' +
                '      "textAlignment": "left"\n' +
                '    },\n' +
                '    "content": [],\n' +
                '    "children": []\n' +
                '  }\n' +
                ']',
              children: [
                {
                  name: 'a)',
                  mark: '1',
                  content:
                    '[\n' +
                    '  {\n' +
                    '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
                    '    "type": "paragraph",\n' +
                    '    "props": {\n' +
                    '      "textColor": "default",\n' +
                    '      "backgroundColor": "default",\n' +
                    '      "textAlignment": "left"\n' +
                    '    },\n' +
                    '    "content": [\n' +
                    '      {\n' +
                    '        "type": "text",\n' +
                    '        "text": "what is 1+1",\n' +
                    '        "styles": {}\n' +
                    '      }\n' +
                    '    ],\n' +
                    '    "children": []\n' +
                    '  },\n' +
                    '  {\n' +
                    '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
                    '    "type": "paragraph",\n' +
                    '    "props": {\n' +
                    '      "textColor": "default",\n' +
                    '      "backgroundColor": "default",\n' +
                    '      "textAlignment": "left"\n' +
                    '    },\n' +
                    '    "content": [],\n' +
                    '    "children": []\n' +
                    '  }\n' +
                    ']',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const createExercice = (fakeData: any) => {
    const newExercise = {
      id: Math.random().toString(36).substring(7),
      name: `Exercice ${fakeData.length + 1}`,
      mark: 0,
      children: [],
    };
    const newData = [...fakeData, newExercise];
    setFakeData(newData);
  };
  if (!data) return;
  return (
    <div dir={data?.language === 'fr' ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: any, index: number) => (
          <CreateExercice allData={fakeData} data={item} setFakeData={setFakeData} key={index} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center relative top-[30px]">
          <div className="bg-[#1B8392] p-2 rounded-full" onClick={() => createExercice(fakeData)}>
            <Image
              src="/ajouter-un-exercice-icon.svg"
              width={20}
              height={20}
              alt="plusicon"
              className="cursor-pointer"
            />
          </div>
          {data?.language === 'fr' ? (
            <span className="text-[#D9D9D9]">Ajoutez un exercice</span>
          ) : (
            <span className="text-[#D9D9D9] ">أضف تمرينا</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
