'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { useState } from 'react';
import { sub } from 'date-fns';
import { render } from 'react-dom';
import next from 'next';
export const CreateSubSubQuestion = ({ data, setFakeData, allData }: any) => {
  console.log(data);

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
  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 ml-[12rem] rounded-xl flex items-center justify-start`}
      >
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
              // defaultValue={}
              maxLength={5}
              // disabled={}
              // value={
              //   exercise.children && exercise.children.length > 0
              //     ? calculateSumOfMarks(exercise).toFixed(2)
              //     : exercise.mark
              // }
              onChange={(e) => {
                // if (!(exercise.children && exercise.children.length > 0)) {
                //   updateMark(e.target.value);
                // }
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
export const CreateSubQuestion = ({ allData, data, setFakeData }: any) => {
  console.log(data);
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

  const handleDeleteSubQuestion = () => {
    console.log(data);
    setFakeData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem: any) => {
              return {
                ...subItem,
                children: subItem.children.filter((subSubItem: any) => {
                  if (subSubItem.id === data.id) {
                    return false;
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
                children: subItem.children.filter((subSubItem: any, index: number) => {
                  subSubItem.name = index + 1 + ')';

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
  const calculerSubMark = (data: any) => {
    const children = data.children;
    console.log(children);

    let sum = 0;
    children.forEach((child: any) => {
      sum += child.mark;
    });
    return sum;
  };
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
              defaultValue={calculerSubMark(data)}
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              // value={
              //   exercise.children && exercise.children.length > 0
              //     ? calculateSumOfMarks(exercise).toFixed(2)
              //     : exercise.mark
              // }
              onChange={(e) => {
                // if (!(exercise.children && exercise.children.length > 0)) {
                //   updateMark(e.target.value);
                // }
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
export const CreateQuestion = ({ allData, data, setFakeData }: any) => {
  console.log(data);
  console.log(allData);
  const onChange = (content: string) => {
    console.log(content);
  };
  const createSubQuestion = () => {
    const newSubQuestion = {
      id: Math.random().toString(36).substring(7),
      name: `${data.children.length + 1})`,
      mark: 0,
      children: [],
    };

    // Update the state to include the new subquestion
    setFakeData((prevData:any) => {
      return prevData.map((item:any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.map((subItem:any) => {
              if (subItem.id === data.id) {
                return {
                  ...subItem,
                  children: [...subItem.children, newSubQuestion],
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    });
  };
  const handelDeleteQuestion = () => {
    setFakeData((prevData: any) => {
      console.log(prevData);
      return prevData.map((item: any) => {
        if (item.id === allData.id) {
          return {
            ...item,
            children: item.children.filter((subItem: any) => subItem.id !== data.id),
          };
        }
        return item;
      });
    });
    handeRenderQuestion();
  };
  const handeRenderQuestion = () => {
    setFakeData((prevData: any) => {
      console.log(prevData);
      return prevData.map((item: any) => {
        const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);
        item.children.map((state: any, index: number) => {
          state.name = getNextChar(index);
        });

        return item;
      });
    });
  };
  const calculerQuestionMark = (data: any) => {
    console.log(data);
    const children = data.children;
    console.log(children);

    let sum = 0;
    children.forEach((child: any) => {
      sum += child.mark;
    });
    return sum;
  };
  const updateQuestion = (e: any, data) => {
    const contet = e.target.value
  };
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
              // defaultValue={calculerQuestionMark(data)}
              maxLength={5}
              disabled={data.children && data.children.length > 0}
              defaultValue={calculerQuestionMark(data)}
              onChange={(e) => {
                updateQuestion(e, data);
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
        <CreateSubQuestion allData={allData} data={item} setFakeData={setFakeData} />
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
        mark: 10,
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
                    // value={}
                    // defaultValue={}
                  />
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5 '
                )}
              >
                <div className={cn('flex text-center text-[#1B8392] leading-tight items-center')}>
                  <Input
                    className={cn(
                      'bg-transparent border-none text-[#1B8392] w-[90px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]'
                    )}
                    placeholder="--.--"
                    maxLength={5}
                    disabled
                    // value={}
                    // defaultValue={}
                  />
                  <span className="text-xl">/ 20.00</span>
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
            <CreateQuestion data={item} allData={data} setFakeData={setFakeData} />
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
    // {
    //   name: 'Exerice n1',
    //   mark: 10,
    //   id: '1x23ds',
    //   children: [
    //     // {
    //     //   name: 'I)',
    //     //   mark: '10',
    //     //   content:
    //     //     '[\n' +
    //     //     '  {\n' +
    //     //     '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
    //     //     '    "type": "paragraph",\n' +
    //     //     '    "props": {\n' +
    //     //     '      "textColor": "default",\n' +
    //     //     '      "backgroundColor": "default",\n' +
    //     //     '      "textAlignment": "left"\n' +
    //     //     '    },\n' +
    //     //     '    "content": [\n' +
    //     //     '      {\n' +
    //     //     '        "type": "text",\n' +
    //     //     '        "text": "what is 1+1",\n' +
    //     //     '        "styles": {}\n' +
    //     //     '      }\n' +
    //     //     '    ],\n' +
    //     //     '    "children": []\n' +
    //     //     '  },\n' +
    //     //     '  {\n' +
    //     //     '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
    //     //     '    "type": "paragraph",\n' +
    //     //     '    "props": {\n' +
    //     //     '      "textColor": "default",\n' +
    //     //     '      "backgroundColor": "default",\n' +
    //     //     '      "textAlignment": "left"\n' +
    //     //     '    },\n' +
    //     //     '    "content": [],\n' +
    //     //     '    "children": []\n' +
    //     //     '  }\n' +
    //     //     ']',
    //     //   children: [
    //     //     {
    //     //       name: '1)',
    //     //       mark: '2',
    //     //       content:
    //     //         '[\n' +
    //     //         '  {\n' +
    //     //         '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
    //     //         '    "type": "paragraph",\n' +
    //     //         '    "props": {\n' +
    //     //         '      "textColor": "default",\n' +
    //     //         '      "backgroundColor": "default",\n' +
    //     //         '      "textAlignment": "left"\n' +
    //     //         '    },\n' +
    //     //         '    "content": [\n' +
    //     //         '      {\n' +
    //     //         '        "type": "text",\n' +
    //     //         '        "text": "what is 1+1",\n' +
    //     //         '        "styles": {}\n' +
    //     //         '      }\n' +
    //     //         '    ],\n' +
    //     //         '    "children": []\n' +
    //     //         '  },\n' +
    //     //         '  {\n' +
    //     //         '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
    //     //         '    "type": "paragraph",\n' +
    //     //         '    "props": {\n' +
    //     //         '      "textColor": "default",\n' +
    //     //         '      "backgroundColor": "default",\n' +
    //     //         '      "textAlignment": "left"\n' +
    //     //         '    },\n' +
    //     //         '    "content": [],\n' +
    //     //         '    "children": []\n' +
    //     //         '  }\n' +
    //     //         ']',
    //     //       children: [
    //     //         {
    //     //           name: 'a)',
    //     //           mark: '1',
    //     //           content:
    //     //             '[\n' +
    //     //             '  {\n' +
    //     //             '    "id": "f8452588-88e4-4770-8037-720fc0cc4e13",\n' +
    //     //             '    "type": "paragraph",\n' +
    //     //             '    "props": {\n' +
    //     //             '      "textColor": "default",\n' +
    //     //             '      "backgroundColor": "default",\n' +
    //     //             '      "textAlignment": "left"\n' +
    //     //             '    },\n' +
    //     //             '    "content": [\n' +
    //     //             '      {\n' +
    //     //             '        "type": "text",\n' +
    //     //             '        "text": "what is 1+1",\n' +
    //     //             '        "styles": {}\n' +
    //     //             '      }\n' +
    //     //             '    ],\n' +
    //     //             '    "children": []\n' +
    //     //             '  },\n' +
    //     //             '  {\n' +
    //     //             '    "id": "ced59dcb-903c-4038-acad-3c28466f95cb",\n' +
    //     //             '    "type": "paragraph",\n' +
    //     //             '    "props": {\n' +
    //     //             '      "textColor": "default",\n' +
    //     //             '      "backgroundColor": "default",\n' +
    //     //             '      "textAlignment": "left"\n' +
    //     //             '    },\n' +
    //     //             '    "content": [],\n' +
    //     //             '    "children": []\n' +
    //     //             '  }\n' +
    //     //             ']',
    //     //         },
    //     //       ],
    //     //     },
    //     //   ],
    //     // },
    //   ],
    // },
  ]);
  console.log(fakeData);

  const createExercice = (fakeData: any) => {
    const newExercise = {
      id: Math.random().toString(36).substring(7),
      name: `Exercice ${fakeData.length + 1}`,
      mark: 10,
      children: [],
    };
    const newData = [...fakeData, newExercise];
    setFakeData(newData);
  };
  if (!data) return;
  return (
    <div dir={data?.language === 'fr' ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: any, index:number) => (
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
