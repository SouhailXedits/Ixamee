'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Editor from './toolbar-editor';

const Exercise = ({ exercise, onAddSubExercise, onDeleteExercise }) => {
  const [subExercises, setSubExercises] = useState(exercise.children || []);
  const addSubExercise = () => {
    const newSubExercise = {
      id: Date.now(),
      name: subExercises.length + 1,
      children: [],
    };
    setSubExercises((prevSubExercises) => [...prevSubExercises, newSubExercise]);
  };

  const deleteSubExercise = (index) => {
    setSubExercises((prevSubExercises) => {
      const newSubExercises = [...prevSubExercises];
      newSubExercises.splice(index, 1);
      renumberSubExercises(index);
      return newSubExercises;
    });
  };

  const renumberSubExercises = (startIndex) => {
    const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);

    setSubExercises((prevExercises) => {
      return prevExercises.map((exercise, index) => {
        return {
          ...exercise,
          name: index + 1,
        };
      });
    });
  };

  return (
    <>
      <div
        className={`relative border  flex  h-auto min-h-[79px] mr-3 rounded-xl flex items-center justify-start`}
      >
        <div
          className="bg-[#CFE8E6]  p-2 rounded-full absolute -left-3 cursor-pointer"
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
              maxLength={5}
            />
            <Image
              src="/redcloseicon.svg"
              width={20}
              height={20}
              alt="redcloseicon"
              className="cursor-pointer"
              onClick={() => onDeleteExercise(exercise.id)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 ">
        {subExercises.map((subExercise, index) => (
          <div className="flex flex-col gap-3 ml-24 ">
            <Exercise
              key={subExercise.id}
              exercise={subExercise}
              onAddSubExercise={() => addSubExercise(index)}
              onDeleteExercise={() => deleteSubExercise(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export const CreateExam = () => {
  const [exercises, setExercises] = useState([
    // {
    //   id: 1,
    //   name: 'I',
    //   children: [
    //     {
    //       id: 3,
    //       name: '1',
    //       children: [
    //         {
    //           id: 5,
    //           name: 'a',
    //           children: [],
    //         },
    //       ],
    //     },
    //     {
    //       id: 4,
    //       name: '2',
    //       children: [
    //         {
    //           id: 6,
    //           name: 'a',
    //           children: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  const addExercise = () => {
    const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);

    const newExercise = {
      id: Date.now(),
      name: getNextChar(exercises.length + 2160),
      children: [],
    };
    setExercises((prevExercises) => [...prevExercises, newExercise]);
  };

  const deleteExercise = (index) => {
    setExercises((prevExercises) => {
      const newExercises = [...prevExercises];
      newExercises.splice(index, 1);
      renumberExercises(index);
      return newExercises;
    });
  };
  const renumberExercises = (startIndex) => {
    const getNextChar = (num: number) => String.fromCharCode(`0x${num}`);

    setExercises((prevExercises) => {
      return prevExercises.map((exercise, index) => {
        return {
          ...exercise,
          name: getNextChar(2160 + index),
        };
      });
    });
  };

  return (
    <div className=" flex flex-col border border-[#D9D9D9] rounded-lg p-2 min-h-[200px] pb-16">
      <div className="flex items-center justify-between w-full p-3">
        <div className="p-3 flex items-center justify-between bg-[#F0F6F8] w-full rounded-xl">
          <div className="flex items-center gap-6">
            <Input
              type="text"
              className="text-2xl bg-transparent border-none w-[180px] -mr-10 -ml-8 text-[#1B8392]"
              defaultValue={'dsdsd'}
            />
            <Image
              src="/editeicon.svg"
              width={24}
              height={24}
              alt="editicon"
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex w-[210px] h-[46px] bg-white rounded-[5px] border justify-center items-center gap-2.5">
              <div className="flex text-center text-[#1B8392] leading-tight items-center">
                <Input
                  className="bg-transparent border-none text-[#1B8392] w-[77px] text-xl text-right placeholder:text-mainGreen p-3 border border-[#1B8392]"
                  placeholder="--.--"
                  maxLength={5}
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
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 ml-10">
        <div className="flex flex-col gap-4 ">
          {exercises.map((exercise, index) => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              onAddSubExercise={() => addExercise(index)}
              onDeleteExercise={() => deleteExercise(index)}
            />
          ))}
        </div>
        <div className="px-4 pt-4 -mb-10">
          <div
            className="bg-[#1B8392] w-52 flex items-center text-white rounded-lg p-2 cursor-pointer"
            onClick={addExercise}
          >
            <Image src="/plusicon.svg" width={20} height={20} alt="plusicon" />
            Ajoutez une question
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
