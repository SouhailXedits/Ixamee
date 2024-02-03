import React from 'react';
import data from './fakeMarkSheetsData';
import StudentRow from './StudentRow';
import PdfHeader from '@/components/shared-components/PdfHeader';

export const MarkSheetStudent = () => {
  // const data = {
  //   terms = [{trimester1: [exams= {}}]
  // }
  return (
    <div>
      <PdfHeader
        meta={{
          estab: 'Lycée Privé Élite Nabeul',
          heading: 'Bulletin de notes',
          session: '2023-2024',
          term: {
            type: 'Trimester',
            number: 2,
          },
          classe: 'Bac math 2',
          fullName: 'souhail brahmi',
          teacherName: 'firas latrach',
          range: 1,
          average: 15.57 }}
        type="MSStudent"
      />
      {/* {data.terms.map(term => ())} */}
      <div className="flex justify-center">
        <table className=" text-center w-[700px] border border-black/50 ">
          <thead className="text-white">
            <td rowSpan={2} className="bg-[#99C6D3] p-1">
              Etudiant
            </td>
            <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 1
            </th>
            <th className="border border-black/50 bg-[#99C6D3]" colSpan={2}>
              DC 2
            </th>
            <th className="border bg-[#99C6D3] border-black/50" colSpan={2}>
              DS 1
            </th>
          </thead>
          <tbody>
            <tr className=" text-[#1B8392]">
              <td className="bg-[#99C6D3]"></td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">rang</td>
              <td className="border bg-[#99C6D3]/40 border-black/50">note</td>
              <td className="border bg-[#99C6D3]/40 border-black/50 h-8">rang</td>
            </tr>
            {data.map((student :any, i :number) => (
              <StudentRow data={student} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
