'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CreateExercice } from './CreateExercice';
import { calcAllMark, calculateChildrenMarks } from './calculateChildrenMarks';

interface Props {
  fakeData: any;
  isArabic: boolean;
  setFakeData: React.Dispatch<React.SetStateAction<any>>;
  realExamContetn: any;
}

function CreateExam({ fakeData, isArabic, setFakeData, realExamContetn }: Props) {
  const totalMark = calcAllMark(fakeData);

  if (!fakeData) return null;

  return (
    <div dir={!isArabic ? 'ltr' : 'rtl'}>
      <div className="flex flex-col gap-4">
        {fakeData?.map((item: any, index: number) => (
          <CreateExercice
            allData={fakeData}
            data={item}
            setFakeData={setFakeData}
            key={index}
            realExamContetn={realExamContetn}
            isArabic={isArabic}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <p>Total Mark: {totalMark}</p>
      </div>
    </div>
  );
}

export default CreateExam;
