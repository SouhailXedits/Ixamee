import React from 'react';
// import StudentRow from './StudentRow';
import PdfHeader from '@/components/shared-components/PdfHeader';
import { calculateAverageMark } from '@/app/_utils/calculateAverage';

export const MarkSheetStudent = ({ data, meta }: any) => {
  // const data = {
  //   terms = [{trimester1: [exams= {}}]
  // }
  console.log(meta)

  return (
    <div>
      <PdfHeader
        meta={{
          ...meta,
          heading: 'Bulletin de notes',
          session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        }}
        // meta={{
        //   estab: 'Lycée Privé Élite Nabeul',
        //   heading: 'Bulletin de notes',
        //   session: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        //   // term: {
        //   //   type: 'Trimester',
        //   //   number: 2,
        //   // },
        //   subject: "",
        //   classe: 'Bac math 2',
        //   fullName: 'souhail brahmi',
        //   teacherName: 'firas latrach',
        //   range: 1,
        //   average: 15.57,
        // }}
        type="MSStudent"
      />
      {/* {data.terms.map(term => ())} */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-10 ">
          {data.map((term: any) => (
            <div className="flex flex-col gap-5 " key={term}>
              <h2>{term.name}</h2>

              <table className=" text-center w-[700px] border border-black/50 ">
                <thead className="text-white">
                  <td className="bg-[#99C6D3] pb-4">Examen</td>
                  <td className="border border-black/50 bg-[#99C6D3] pb-4">Coefficient</td>
                  <td className="border border-black/50 bg-[#99C6D3] pb-4">Note</td>
                  <td className="border bg-[#99C6D3] border-black/50 pb-4">Rang</td>
                  <td className="border bg-[#99C6D3] border-black/50 pb-4">Progrès</td>
                </thead>
                <tbody>
                  {term.exams?.map((exam: any) => (
                    <tr className="" key={exam.exam_id}>
                      {/* <td className="bg-[#99C6D3]"></td> */}
                      <td className="pb-4 border border-black/50">{exam.name}</td>
                      <td className="pb-4 border border-black/50">{exam.coefficient}</td>
                      <td className="pb-4 border border-black/50">
                        {exam.marksObtained} / {exam.totalScore}
                      </td>
                      <td className="pb-4 border border-black/50">{exam.range}</td>
                      <td className="pb-4 border border-black/50">--</td>
                      {/* <td className="border bg-[#99C6D3]/40 border-black/50 h-8">rang</td> */}
                    </tr>
                  ))}
                  <tr className=" bg-6/50">
                    <td className="pb-4" colSpan={3}>
                      Moyenne trimestrelle : {calculateAverageMark([term]) || '--'}
                    </td>
                    <td className="pb-4" colSpan={5}>
                      range : {term.exams.length > 0 && meta.range || '--'}
                    </td>
                    {/* <td colSpan={3}>-</td> */}
                  </tr>

                  {/* {data.map((student :any, i :number) => (
              <StudentRow data={student} key={i} />
            ))} */}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
