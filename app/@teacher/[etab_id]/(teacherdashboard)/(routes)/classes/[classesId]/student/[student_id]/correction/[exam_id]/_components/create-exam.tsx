'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CreateExercice } from './CreateExercice';
import { calcAllMark, calculateChildrenMarks } from './calculateChildrenMarks';

function CreateExam({ fakeData, isArabic, setFakeData, realExamContetn }: any) {
  // function calculateTotalMark(data: any) {
  //   let totalMark = 0;

  //   function calculateMarkRecursive(item: any) {
  //
  //     totalMark += parseInt(item.mark, 10) || 0; // Convert mark to integer and add to totalMark

  //     if (item.children) {
  //       item.children.forEach((child) => {
  //         calculateMarkRecursive(child); // Recursively calculate mark for each child
  //       });
  //     }
  //   }

  //   data.forEach((item) => {
  //     calculateMarkRecursive(item); // Start the recursive calculation for each item in the data array
  //   });

  //   return totalMark;
  // }

  // // Call the function passing the fakeData array to get the total mark
  // const totalMark = calculateTotalMark(fakeData);
  //
  // if (!data) return;
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

      <div className="flex flex-col gap-4"></div>
    </div>
  );
}

export default CreateExam;
