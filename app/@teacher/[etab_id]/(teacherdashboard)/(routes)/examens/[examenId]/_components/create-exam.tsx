'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CreateExerciceProps } from './CreateExercice';

type CreateExamProps = {
  data: CreateExerciceProps['data'][];
  fakeData: CreateExerciceProps['data'][];
  isArabic: boolean;
  setFakeData: React.Dispatch<React.SetStateAction<CreateExerciceProps['data'][]>>;
};

function CreateExam({ data, fakeData, isArabic, setFakeData }: CreateExamProps) {
  const createExercice = (fakeData: CreateExerciceProps['data']) => {
    const newExercise: CreateExerciceProps['data'] = {
      id: Math.random().toString(36).substring(7),
      name: isArabic ? ` تمرين ${fakeData.length + 1}` : `Exercice ${fakeData?.length + 1}`,
      mark: 1,
      children: [],
    };
    const newData = [...fakeData, newExercise];
    setFakeData(newData);
  };

  const calculateTotalMark = (data: CreateExerciceProps['data'][]): number => {
    let totalMark = 0;

    const calculateMarkRecursive = (item: CreateExerciceProps['data']): void => {
      const mark = item.mark;

      if (typeof mark === 'string') {
        const parsedMark = parseInt(mark, 10);

        if (!isNaN(parsedMark)) {
          totalMark += parsedMark;
        } else {
          console.error(`Invalid mark value: ${mark}`);
        }
      } else {
        console.error(`Invalid mark type: ${typeof mark}`);
      }

      if (item.children) {
        item.children.forEach((child) => {
          if (child) {
            calculateMarkRecursive(child);
          }
        });
      }
    };

    data.forEach((item) => {
      if (item) {
        calculateMarkRecursive(item);
      }
    });

    return totalMark;
  };

  // Call the function passing the fakeData array to get the total mark
  const totalMark = calculateTotalMark(fakeData);

  return (
    <div dir={!isArabic ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: CreateExerciceProps['data'], index: number) => (
          <CreateExercice
            allData={fakeData}
            data={item}
            setFakeData={setFakeData}
            key={index}
            isArabic={isArabic}
          />
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
          {!isArabic ? (
            <span className="text-[#D9D9D
