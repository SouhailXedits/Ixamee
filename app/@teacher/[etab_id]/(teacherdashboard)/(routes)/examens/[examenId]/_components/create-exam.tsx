'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CreateExercice } from './CreateExercice';
// import { calcAllMark, calculateChildrenMarks } from './calculateChildrenMarks';

function CreateExam({ data, fakeData, isArabic, setFakeData }: any) {
  console.log(fakeData);
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

  const createExercice = (fakeData: any) => {
    const newExercise = {
      id: Math.random().toString(36).substring(7),
      name: isArabic ? ` تمرين ${fakeData.length + 1}` : `Exercice ${fakeData?.length + 1}`,
      mark: 0,
      children: [],
    };
    let newFakeData = fakeData || [];
    const newData = [...newFakeData, newExercise];
    setFakeData(newData);
  };
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
