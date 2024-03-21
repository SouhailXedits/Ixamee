import React from 'react';
import PdfHeader from '@/components/shared-components/PdfHeader';
import data from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/pdf/components/fakeMarkSheetsData copy';
import StudentRow from './StudentRow';

export const MarkSheetPdfClass = ({ StudentsData, term, classe, estab }: any) => {
  const splitedTerm = term.split('_');
  const sortedStudents = StudentsData?.sort((a: any, b: any) => a.rank - b.rank);
  let studentCount = 0;

  console.log(sortedStudents);

  const overallAverage =
    StudentsData?.reduce((total: number, student: any) => {
      return total + student?.average;
    }, 0) / StudentsData?.length;

  return (
    <div>
      <PdfHeader
        meta={{
          estab: estab,
          heading: 'Bulletin de notes',
          session: '2023-2024',
          term: {
            type: splitedTerm[0],
            number: splitedTerm[1],
          },
          classe: classe,
          studentsNum: StudentsData?.length,
        }}
        type="MSTeach"
      />
      <div className="flex justify-center">
        <table className="text-center w-[700px] border border-black/50">
          <thead className="text-white">
            <th rowSpan={2} className="bg-[#99C6D3] p-1">
              Etudiant
            </th>
            {sortedStudents?.length &&
              sortedStudents?.[0].exams.map((studentExam: any) => (
                <th
                  key={studentExam.id}
                  className="border border-black/50 bg-[#99C6D3] pb-4"
                  colSpan={2}
                >
                  {studentExam.name}
                </th>
              ))}
          </thead>
          <tbody>
            <tr className="text-[#1B8392]">
              <td className="bg-[#99C6D3]"></td>
              {sortedStudents?.length &&
                sortedStudents?.[0].exams.map((studentExam: any) => (
                  <>
                    <td className="border bg-[#99C6D3]/40 border-black/50 pb-4">Note</td>
                    <td className="border bg-[#99C6D3]/40 border-black/50 pb-4">Rang</td>
                  </>
                ))}
            </tr>
            {sortedStudents?.map((student: any, i: number) => {
              studentCount++;
              return (
                <>
                  <StudentRow data={student} key={i} />
                  {studentCount % 18 === 0 && <div className=" h-24" />}
                </>
              );
            })}
            <tr>
              <td className="bg-6/40 pb-3" colSpan={sortedStudents?.[0]?.exams.length + 3}>
                Moyenne generale : {overallAverage.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
