'use client'
import React, { useState, ChangeEvent } from 'react';
import Editor from './toolbar-editor';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface CreateExamProps {}

interface Question {
  content: string;
  score: string;
  subquestions?: Question[];
}

interface Exercise {
  name: string;
  questions: Question[];
}

const CreateExam: React.FC<CreateExamProps> = () => {
  const [editMode, setEditMode] = useState(true);
  const [value, setValue] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: 'Exercise 2',
      questions: [{ content: '', score: '0.00', subquestions: [{ content: '', score: '0.00' }] }],
    },
    {
      name: 'Exercise 1',
      questions: [{ content: '', score: '0.00', subquestions: [{ content: '', score: '0.00' }] }],
    },
  ]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);

  const handleChange = (content: string) => {
    console.log(content);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, '');
    const dotCount = (inputValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      inputValue = inputValue.slice(0, -1);
    }
    if (parseFloat(inputValue) < 0) {
      inputValue = '0.00';
    } else if (parseFloat(inputValue) > 20) {
      inputValue = '20.00';
    }
    setValue(inputValue);
  };

  const handleEditModeToggle = () => {
    setEditMode((prevState) => !prevState);
  };

  const generateQuestion = (parentExerciseIndex: number, parentQuestionIndex?: number) => {
    console.log('gen question')
    // const newQuestion: Question = {
    //   content: '',
    //   score: '0.00',
    //   subquestions: [],
    // };

    // if (parentQuestionIndex !== undefined) {
    //   exercises[parentExerciseIndex].questions[parentQuestionIndex].subquestions.push(newQuestion);
    // } else {
    //   exercises[parentExerciseIndex].questions.push(newQuestion);
    // }

    // setExercises([...exercises]);
  };

  const deleteQuestion = (exerciseIndex: number, questionIndex: number) => {
    // Your existing deleteQuestion logic
  };

  // const deleteSubQuestion = (
  //   exerciseIndex: number,
  //   questionIndex: number,
  //   subQuestionIndex: number
  // ) => {
  //   setExercises((prevExercises) => {
  //     const updatedExercises = [...prevExercises];
  //     const exercise = updatedExercises[exerciseIndex];

  //     if (
  //       exercise &&
  //       exercise.questions.length > questionIndex &&
  //       exercise.questions[questionIndex].subquestions.length > subQuestionIndex
  //     ) {
  //       exercise.questions[questionIndex].subquestions = exercise.questions[
  //         questionIndex
  //       ].subquestions.filter((_, index) => index !== subQuestionIndex);
  //     }

  //     return updatedExercises;
  //   });
  // };

  const deleteExercise = (exerciseIndex: number) => {
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises.splice(exerciseIndex, 1);
      return updatedExercises;
    });
  };

  const renderQuestion = (
    exerciseIndex: number,
    questionIndex: number,
    subQuestionIndex?: number
  ) => {
    return (
      <div
        key={subQuestionIndex ?? questionIndex}
        className={`relative border h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 
        cursor-pointer"
          onClick={() => generateQuestion(exerciseIndex, questionIndex)}
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5 ">
          <div className="w-[80%] flex items-center">
            <span>{questionIndex + 1})</span>
            <Editor onChange={handleChange} />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[77px] text-xl placeholder:text-mainGreen p-3 border border-[#1B8392]"
              placeholder="--.--"
              maxLength={5}
              value={value}
              onInput={handleInput}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => deleteQuestion(exerciseIndex, questionIndex)}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderSubSubQuestions = () => {
    return (
      <div
        className={`relative border h-auto min-h-[79px] mr-20 rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6] p-2 rounded-full absolute -left-3 
        cursor-pointer"
        >
          <Image src="/plusiconforsubexercice.svg" width={10} height={10} alt="plusicon" />
        </div>
        <div className="flex items-center justify-between w-full gap-3 px-5 ">
          <div className="w-[80%] flex items-center">
            <span>a</span>
            <Editor onChange={handleChange} />
          </div>
          <div className="flex gap-3 item-center">
            <Input
              className="bg-transparent a text-[#1B8392] w-[77px] text-xl placeholder:text-mainGreen p-3 border border-[#1B8392]"
              placeholder="--.--"
              maxLength={5}
              value={value}
              onInput={handleInput}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              // onClick={() => deleteQuestion(exerciseIndex, questionIndex)}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderSubQuestions = (
    exerciseIndex: number,
    questionIndex: number,
    subQuestions: Question[]
  ) => {
    return (
      <div className="flex flex-col gap-6 ml-10">
        {subQuestions.map((subQuestion, subQuestionIndex) => {
          return renderQuestion(exerciseIndex, questionIndex, subQuestionIndex);
          // renderSubSubQuestions()
        })}
      </div>
    );
  };

  const renderQuestions = (exerciseIndex: number, questions: Question[]) => {
    return (
      <div className="flex flex-col gap-6 ml-10">
        {questions.map((question, questionIndex) => (
          <>
            {renderQuestion(exerciseIndex, questionIndex)}
            {question.subquestions &&
              question.subquestions.length > 0 &&
              renderSubQuestions(exerciseIndex, questionIndex, question.subquestions)}
          </>
        ))}
      </div>
    );
  };

  const renderExercise = (exercise: Exercise, exerciseIndex: number) => {
    return (
      <div
        key={exerciseIndex}
        className="border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16"
      >
        <div className="flex items-center justify-between w-full p-3">
          <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
            <div className="flex items-center gap-6">
              <Input
                type="text"
                className="text-2xl bg-transparent border-none w-[140px] text-[#1B8392]"
                defaultValue={exercise.name}
                disabled={editMode}
              />
              <Image
                src="/editeicon.svg"
                width={24}
                height={24}
                alt="editicon"
                className="cursor-pointer"
                onClick={handleEditModeToggle}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5">
                <div className="flex text-center text-[#1B8392] leading-tight items-center">
                  <Input
                    className="bg-transparent border-none w-[77px] text-right text-xl placeholder:text-mainGreen"
                    placeholder="--.--"
                    maxLength={5}
                    value={value}
                    onInput={handleInput}
                    disabled
                  />
                  <span className="text-xl">/ 20.00</span>
                </div>
              </div>
              <Image
                src="/redcloseicon.svg"
                width={20}
                height={20}
                alt="redcloseicon"
                onClick={() => deleteExercise(exerciseIndex)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {renderQuestions(exerciseIndex, exercise.questions)}

        <div className="px-4 pt-4 -mb-10">
          <div
            className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer"
            onClick={() => generateQuestion(exerciseIndex)}
          >
            <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
            Ajoutez une question
          </div>
        </div>
      </div>
    );
  };

  const renderExercises = () => {
    return (
      <div className="flex flex-col gap-4">
        {exercises.map((exercise, exerciseIndex) => renderExercise(exercise, exerciseIndex))}
        <div className="flex flex-col items-center justify-center relative top-[70px]">
          <div
            className="bg-[#1B8392] p-2 rounded-full"
            onClick={() =>
              setExercises([
                ...exercises,
                { name: `Exercise ${exercises.length + 1}`, questions: [] },
              ])
            }
          >
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
    );
  };

  return <>{renderExercises()}</>;
};

export default CreateExam;
