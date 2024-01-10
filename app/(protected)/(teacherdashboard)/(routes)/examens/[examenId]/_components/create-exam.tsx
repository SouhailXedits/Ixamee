'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Editor from './toolbar-editor';
import { cn } from '@/lib/utils';

interface SubExercise {
  id: number;
  name: string;
  mark: string;
  children: SubExercise[];
}

interface ExerciseProps {
  exercise: {
    id: number;
    name: string;
    mark: string;
    children?: SubExercise[];
  };
  onAddSubExercise: () => void;
  ondeleteQuestion: (index: number) => void;
  updateMark: (value: string) => void; // Updated the type of updateMark
}

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  onAddSubExercise,
  ondeleteQuestion,
  updateMark,
}) => {
  const [subExercises, setSubExercises] = useState<SubExercise[]>(exercise.children || []);

  const addSubExercise = () => {
    const newSubExercise = {
      id: Date.now(),
      name: subExercises.length + 1,
      mark: '00.00',
      children: [],
    };
    setSubExercises((prevSubExercises: any) => [...prevSubExercises, newSubExercise]);
  };

  const deleteSubExercise = (index: number) => {
    setSubExercises((prevSubExercises) => {
      const newSubExercises = [...prevSubExercises];
      newSubExercises.splice(index, 1);
      renumberSubExercises(index);
      return newSubExercises;
    });
  };

  const renumberSubExercises = (startIndex: number) => {
    setSubExercises((prevExercises: any) => {
      return prevExercises.map((exercise: any, index: number) => {
        return {
          ...exercise,
          name: index + 1,
        };
      });
    });
  };

  const calculateSumOfMarks = (exercise: SubExercise): number => {
    if (exercise.children && exercise.children.length > 0) {
      return exercise.children.reduce(
        (sum, subExercise) => sum + calculateSumOfMarks(subExercise),
        0
      );
    } else {
      return parseFloat(exercise.mark);
    }
  };

  return (
    <>
      <div
        className={`relative border flex h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 cursor-pointer"
          onClick={addSubExercise}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5">
          <div className="w-[80%] flex items-center">
            <span>{exercise.name}</span>
            <span>)</span>
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
              defaultValue={exercise.mark}
              maxLength={5}
              disabled={exercise.children && exercise.children.length > 0}
              onChange={(e) => {
                if (!(exercise.children && exercise.children.length > 0)) {
                  // Only update the mark if it doesn't have subquestions
                  updateMark(e.target.value);
                }
              }}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => ondeleteQuestion(exercise.id)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 ">
        {subExercises.map((subExercise, index) => (
          <div className="flex flex-col gap-3 ml-24 " key={index}>
            <Exercise
              exercise={subExercise}
              onAddSubExercise={() => addSubExercise(index)}
              ondeleteQuestion={() => deleteSubExercise(index)}
              updateMark={(value) => updateMark(value)} // Updated the call to updateMark
            />
          </div>
        ))}
      </div>
    </>
  );
};

export const CreateExam = () => {
  const [editeExerciceName, setEditeExerciceName] = useState<null | Number>(null);
  const [exercises, setExercises] = useState([
    [
      {
        id: 1,
        name: 'I',
        title: 'Exercice n1',
        mark: '02.00',
        children: [
          {
            id: 3,
            name: '1',
            mark: '02.00',
            children: [
              {
                id: 5,
                name: 'a',
                mark: '02.00',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  ]);
  console.log(exercises);
  const calculateTotalExamMark = (): string => {
    return (
      exercises.reduce((total, exerciseGroup) => {
        return total + calculateSumOfMarks(exerciseGroup);
      }, 0) + '.00'
    );
  };

  const addquestion = (mainIndex: number) => {
    const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);
    const newExercise = {
      id: Date.now(),
      name: getNextChar(exercises[mainIndex].length + 2160),
      mark: 0,
      children: [],
    };

    setExercises((prevExercises: any) => {
      const newExercises = [...prevExercises];
      newExercises[mainIndex] = [...newExercises[mainIndex], newExercise];
      return newExercises;
    });
  };

  const deleteQuestion = (mainIndex: number) => {
    setExercises((prevExercises) => {
      const newExercises = [...prevExercises];
      newExercises[mainIndex].splice(0, 1);
      renumberQuestion(mainIndex);
      return newExercises;
    });
  };

  const addExercice = () => {
    const newExercise = [
      {
        id: Date.now(),
        title: `Exercise ${exercises.length + 1} `,
        mark: '00.00',
        children: [],
      },
    ];

    setExercises((prevExercises: any) => {
      return [...prevExercises, newExercise];
    });
  };

  const renumberQuestion = (mainIndex: number) => {
    const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);

    setExercises((prevExercises: any) => {
      return prevExercises.map((exerciseGroup: any, index: number) => {
        if (index === mainIndex) {
          return exerciseGroup.map((exercise: any, subIndex: number) => {
            return {
              ...exercise,
              name: getNextChar(2160 + subIndex),
            };
          });
        } else {
          return exerciseGroup;
        }
      });
    });
  };

  const calculateSumOfMarks = (exerciseGroup: any): number => {
    if (Array.isArray(exerciseGroup)) {
      return exerciseGroup.reduce((sum, exercise) => sum + calculateSumOfMarks(exercise), 0);
    } else {
      // If exerciseGroup is not an array, it's a single exercise object
      return parseFloat(exerciseGroup.mark || '0');
    }
  };

  const updateMark = (mainIndex: number, subIndex: number, value: string) => {
    setExercises((prevExercises: any) => {
      const newExercises = [...prevExercises];
      newExercises[mainIndex][subIndex].mark = value;
      return newExercises;
    });
  };

  return (
    <>
      {exercises.map((mainExercise, mainIndex: number) => {
        console.log(exercises[mainIndex][0]?.mark);
        return (
          <div
            key={mainIndex}
            className="flex flex-col border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16"
          >
            <div className="flex items-center justify-between w-full p-3">
              <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
                <div className="flex items-center gap-10">
                  <Input
                    type="text"
                    className="text-2xl bg-transparent border-none w-[220px] -mr-10 -ml-8 text-[#1B8392]"
                    defaultValue={exercises[mainIndex][0]?.title || 'Exercice'}
                    value={mainExercise[mainIndex]?.title}
                    onChange={(e) => {
                      editeExerciceName === mainExercise[mainIndex]?.id &&
                        setExercises((prevExercises: any) => {
                          const newExercises = [...prevExercises];
                          newExercises[mainIndex][0].title = e.target.value;
                          return newExercises;
                        });
                    }}
                    disabled={editeExerciceName !== mainExercise[mainIndex]?.id}
                  />
                  <Image
                    src="/editeicon.svg"
                    width={24}
                    height={24}
                    alt="editicon"
                    onClick={
                      editeExerciceName !== mainExercise[mainIndex]?.id
                        ? () => setEditeExerciceName(mainExercise?.[mainIndex]?.id)
                        : () => setEditeExerciceName(null)
                    }
                    className="cursor-pointer"
                  />
                </div>
                {}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5',
                      calculateTotalExamMark(exercises) > 20 &&
                        'border-2 border-red border-dotted text-white'
                    )}
                  >
                    <div
                      className={cn(
                        'flex text-center text-[#1B8392] leading-tight items-center',
                        calculateTotalExamMark() > 20 && 'text-red'
                      )}
                    >
                      <Input
                        className={cn(
                          'bg-transparent border-none text-[#1B8392] w-[90px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]',
                          calculateTotalExamMark() > 20 && 'text-red'
                        )}
                        placeholder="--.--"
                        maxLength={5}
                        disabled
                        value={calculateTotalExamMark()}
                        defaultValue={calculateSumOfMarks(exercises[mainIndex])}
                        // defaultValue={exercises[mainIndex][0]?.mark || '0'}
                      />
                      <span className="text-xl">/ 20.00</span>
                    </div>
                  </div>
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
                {mainExercise.map((subExercise, subIndex: number) => (
                  <Exercise
                    key={subIndex}
                    exercise={subExercise}
                    onAddSubExercise={() => addquestion(mainIndex)}
                    ondeleteQuestion={() => deleteQuestion(mainIndex)}
                    updateMark={(value: any) => updateMark(mainIndex, subIndex, value)}
                  />
                ))}
              </div>
              <div className="px-4 pt-4 -mb-10">
                <div
                  className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer"
                  onClick={() => addquestion(mainIndex)}
                >
                  <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
                  Ajoutez une question
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center relative top-[30px]">
          <div className="bg-[#1B8392] p-2 rounded-full" onClick={() => addExercice()}>
            <Image
              src="/ajouter-un-exercice-icon.svg"
              width={20}
              height={20}
              alt="plusicon"
              className="cursor-pointer"
            />
          </div>
          <span className="text-[#D9D9D9]">Ajoutez un exercice</span>
        </div>
      </div>
    </>
  );
};

export default CreateExam;
