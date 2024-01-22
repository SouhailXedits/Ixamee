// 'use client';
// import React, { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import Image from 'next/image';
// import Editor from './toolbar-editor';
// import { cn } from '@/lib/utils';
// interface SubSubExercise {
//   id: number;
//   name: string;
//   mark: string;
// }

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { any } from 'zod';
import Editor from './toolbar-editor';

// interface SubExercise {
//   id: number;
//   name: string;
//   mark: string;
//   children?: SubSubExercise[];
// }

// interface ExerciseProps {
//   exercise: {
//     id: number;
//     name: string;
//     mark: string;
//     children?: SubExercise[];
//   };
//   onAddSubExercise: () => void;
//   ondeleteQuestion: (index: number) => void;
//   updateMark: (value: string) => void;
//   parentHasSubExercise: boolean;
// }

// const Exercise: React.FC<ExerciseProps> = ({
//   exercise,
//   onAddSubExercise,
//   ondeleteQuestion,
//   updateMark,
//   parentHasSubExercise,
// }) => {
//   const [subExercises, setSubExercises] = useState<SubExercise[]>(exercise.children || []);

//   const addSubExercise = () => {
//     const newSubExercise = {
//       id: Date.now(),
//       name: subExercises.length + 1,
//       mark: '00.00',
//       children: [],
//     };
//     console.log(newSubExercise);
//     setSubExercises((prevSubExercises: SubExercise[]) => [...prevSubExercises, newSubExercise]);
//   };

//   const deleteSubExercise = (index: number) => {
//     setSubExercises((prevSubExercises) => {
//       const newSubExercises = [...prevSubExercises];
//       newSubExercises.splice(index, 1);
//       renumberSubExercises(index);
//       return newSubExercises;
//     });
//   };

//   const renumberSubExercises = (startIndex: number) => {
//     setSubExercises((prevExercises: any) => {
//       return prevExercises.map((exercise, index) => {
//         return {
//           ...exercise,
//           name: index + 1,
//         };
//       });
//     });
//   };

//   const calculateSumOfMarks = (exercise: SubExercise): number => {
//     if (exercise.children && exercise.children.length > 0) {
//       return exercise.children.reduce(
//         (sum, subExercise) => sum + calculateSumOfMarks(subExercise),
//         0
//       );
//     } else {
//       return parseFloat(exercise.mark);
//     }
//   };
//   console.log(exercise);

//   return (
//     <>

<div className="flex flex-col gap-4 "></div>;
// </>
//   );
// };

// export const CreateExam = ({ examId }: { examId: string }) => {
//   console.log(examId);
//   const [editeExerciceName, setEditeExerciceName] = useState<null | Number>(null);

//   const [exercises, setExercises] = useState([]);

//   const calculateTotalExamMark = () => {
//     return (
//       exercises.reduce((total, exerciseGroup) => {
//         return total + calculateSumOfMarks(exerciseGroup);
//       }, 0) + '.00'
//     );
//   };

//   const addquestion = (mainIndex: number) => {
//     const getNextChar = (num: number) => String.fromCharCode(0x2160 + num);
//     const newExercise = {
//       id: Date.now(),
//       name: getNextChar(exercises[mainIndex].length),
//       mark: '00.00',
//       children: [],
//     };
//     console.log(exercises);
//     setExercises((prevExercises: any) => {
//       const newExercises = [...prevExercises];
//       console.log(newExercises);
//       newExercises[mainIndex] = [...newExercises[mainIndex], newExercise];
//       return newExercises;
//     });
//     console.log(exercises);
//   };

//   const deleteQuestion = (mainIndex: number) => {
//     setExercises((prevExercises) => {
//       const newExercises = [...prevExercises];
//       newExercises[mainIndex].splice(0, 1);
//       renumberQuestion(mainIndex);
//       return newExercises;
//     });
//   };

//   const addExercice = () => {
//     const newExercise = [
//       {
//         id: Date.now(),
//         title: `Exercise ${exercises.length + 1} `,
//         name: 'I',
//         mark: '00.00',
//         children: [],
//       },
//     ];

//     setExercises((prevExercises: any) => {
//       return [...prevExercises, newExercise];
//     });
//   };
//   console.log(exercises);

//   const renumberQuestion = (mainIndex: number) => {
//     const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);

//     setExercises((prevExercises: any) => {
//       return prevExercises.map((exerciseGroup: any, index: number) => {
//         if (index === mainIndex) {
//           return exerciseGroup.map((exercise: any, subIndex: number) => {
//             return {
//               ...exercise,
//               name: getNextChar(2160 + subIndex),
//             };
//           });
//         } else {
//           return exerciseGroup;
//         }
//       });
//     });
//   };

//   const calculateSumOfMarks = (exerciseGroup: any): number => {
//     console.log(exerciseGroup);
//     if (Array.isArray(exerciseGroup)) {
//       return exerciseGroup.reduce((sum, exercise) => sum + calculateSumOfMarks(exercise), 0);
//     } else {
//       return parseFloat(exerciseGroup.mark || '0');
//     }
//   };

//   const updateMark = (mainIndex: number, subIndex: number, value: string) => {
//     setExercises((prevExercises) => {
//       console.log(prevExercises);
//       const newExercises = [...prevExercises];
//       newExercises[mainIndex][subIndex].mark = value;
//       return newExercises;
//     });
//   };
//   console.log(exercises);

//   return (
//     <>
{
  // exercises.map((mainExercise, mainIndex: number) => {
  //   return (
  //     <div
  //       key={mainIndex}
  //       className="flex flex-col border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16"
  //     >
  //       <div className="flex items-center justify-between w-full p-3">
  //         <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
  //           <div className="flex items-center gap-10">
  //             <Input
  //               type="text"
  //               className="text-2xl bg-transparent border-none w-[220px] -mr-10 -ml-1 text-[#1B8392]"
  //               defaultValue={ }
  //               value={ }
  //             />
  //             <Image
  //               src="/editeicon.svg"
  //               width={24}
  //               height={24}
  //               alt="editicon"
  //               onClick={}
  //               className="cursor-pointer"
  //             />
  //           </div>
  //           {}
  //           <div className="flex items-center gap-3">
  //             <div
  //               className={cn(
  //                 'flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5'
  //               )}
  //             >
  //               <div
  //                 className={cn(
  //                   'flex text-center text-[#1B8392] leading-tight items-center',
  //                   calculateTotalExamMark() > 20 && 'text-red'
  //                 )}
  //               >
  //                 <Input
  //                   className={cn(
  //                     'bg-transparent border-none text-[#1B8392] w-[90px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]'
  //                   )}
  //                   placeholder="--.--"
  //                   maxLength={5}
  //                   disabled
  //                   value={calculateTotalExamMark()}
  //                   defaultValue={calculateSumOfMarks(exercises[mainIndex])}
  //                 />
  //                 <span className="text-xl">/ 20.00</span>
  //               </div>
  //             </div>
  //             <Image
  //               src="/redcloseicon.svg"
  //               width={20}
  //               height={20}
  //               alt="redcloseicon"
  //               className="cursor-pointer"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex flex-col gap-6 ml-10">
  //         <div className="flex flex-col gap-4 ">dsds</div>
  //         <div className="px-4 pt-4 -mb-10">
  //           <div
  //             className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer"
  //             onClick={() => {}}
  //           >
  //             <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
  //             Ajoutez une question
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
}

//     </>
//   );
// };
const Fakedata = [
  {
    name: 'Exerice n1',
    mark: 10,
    children: [
      {
        name: 'I)',
        mark: '10',
        content: 'what is 1+1',
        children: [
          {
            name: '1)',
            mark: '2',
            content: 'what is 10+20',
            children: [
              {
                name: 'a)',
                mark: '1',
                content: 'what is 10+20',
              },
            ],
          },
        ],
      },
    ],
  },
];
export const CreateQuestion = ({ data }: any) => {
  return (
    <div
      className={`relative border flex h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
    >
      <div
        className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 cursor-pointer"
        onClick={() => {}}
      >
        <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
      </div>
      <div className="flex items-center justify-between w-full gap-3 px-5">
        <div className="w-[80%] flex items-center">
          <span>1</span>
          <span>)</span>
          {/* Adjusted Editor component */}
          <Editor
            onChange={() => {
              console.log('handleChange');
            }}
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
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export const CreateExercice = ({ data }: any) => {
  console.log(data);
  if (!data) return;
  console.log(data);
  const language = data?.language;
  console.log(language);
  const isArabic = language === 'ar';
  console.log(isArabic);
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
              defaultValue={!isArabic ? 'Exercice 1' : 'تمرين 1'}
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
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 ml-10">
        <div className="flex flex-col gap-4 ">
          {/* {isArabic && (
            <span className="pr-10 -mb-4 text-xl pt-2 text-[#D9D9D9]">اكتب النص هنا</span>
          )} */}
          <CreateQuestion data={data} />
        </div>
        <div className="px-4 pt-4 -mb-10">
          <div
            className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer justify-center  "
            onClick={() => {}}
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
  console.log(data);
  return (
    <div dir={data?.language === 'fr' ? 'ltr' : 'rtl'}>
      <CreateExercice data={data} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center relative top-[30px]">
          <div className="bg-[#1B8392] p-2 rounded-full" onClick={() => console.log()}>
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
