import React from 'react';
import PdfHeader from '@/components/shared-components/PdfHeader';
import data from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/pdf/components/fakeMarkSheetsData copy';
import StudentRow from './StudentRow';

export const MarkSheetPdfClass = ({ StudentsData, term, classe, estab }: any) => {
  const splitedTerm = term.split('_');

  return (
    <div>
      <PdfHeader
        meta={{
          estab: estab,
          // estab: 'Lycée Privé Élite Nabeul',
          heading: 'Bulletin de notes',
          session: '2023-2024',
          // term: term,
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
        <table className=" text-center w-[700px] border border-black/50 ">
          <thead className="text-white">
            <th rowSpan={2} className="bg-[#99C6D3] p-1">
              Etudiant
            </th>
            {StudentsData?.length &&
              StudentsData?.[0].exams.map((studentExam: any) => (
                <th
                  key={studentExam.id}
                  className="border border-black/50 bg-[#99C6D3] pb-4"
                  colSpan={2}
                >
                  {studentExam.name}
                </th>
              ))}
            {/* <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 1
            </th>
            <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 2
            </th>
            <th className="border bg-[#99C6D3] border-black/50" colSpan={2}>
              DS 1
            </th> */}
          </thead>
          <tbody>
            <tr className=" text-[#1B8392]">
              <td className="bg-[#99C6D3]"></td>
              {StudentsData?.length &&
                StudentsData?.[0].exams.map((studentExam: any) => (
                  <>
                    <td className="border bg-[#99C6D3]/40 border-black/50 pb-4">Note</td>
                    <td className="border bg-[#99C6D3]/40 border-black/50 pb-4">Rang</td>
                  </>
                ))}

              {/* <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50 h-8">rang</td> */}
            </tr>
            {StudentsData?.map((student: any, i: number) => (
              <StudentRow data={student} key={i} />
            ))}
            {/* {data.map((student: any, i: number) => (
              <StudentRow data={student} key={i} />
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
