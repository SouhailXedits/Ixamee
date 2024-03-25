'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CreateExercice } from './CreateExercice';
import FilesRenderer from '../FilesRenderer';
// import { calcAllMark, calculateChildrenMarks } from '@/app/_utils/calculateChildrenMarks';

function CreateExam({ fakeData, isArabic, setFakeData, realExamContetn }: any) {
  return (
    <div dir={!isArabic ? 'ltr' : 'rtl'}>
      <FilesRenderer/>
      <div className="flex flex-col gap-4 p-10">
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

      <div className="flex flex-col gap-4"></div>
    </div>
  );
}

export default CreateExam;
