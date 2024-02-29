'use client';
import PdfHeader from '@/components/shared-components/PdfHeader';
import React, { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamCorrectionById, getExamCorrectionById2 } from '@/actions/exam-correction';
import { useParams } from 'next/navigation';
import {
  getMaxDepth,
  getNoteOf,
} from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/student/[student_id]/correction/[exam_id]/_components/calculateChildrenMarks';
import { calcSumOfMarks } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/[examenId]/_components/sharedFunction';

export default function Evaluation({ userExamCorectionContent, userDetails }: any) {
  const params = useParams();
  console.log(params);
  console.log(userExamCorectionContent);
  console.log(userDetails, 'userDetails');
  const classe_id = params.etab_id as string;
  if (!userExamCorectionContent?.correction_exam_content) {
    return null;
  }
  // Logging for debugging
  const queryClient = useQueryClient();

  // const etab_id = queryClient.getQueryData(['etab_id']) as any;
  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  const user = queryClient.getQueryData(['user']) as any;

  const estab = teacherEstab?.filter((item: any) => {
    return item.id == params.etab_id;
  });
  console.log(userExamCorectionContent, 'userExamCorectionContent');
  const examId = userExamCorectionContent?.exam_id;
  const [examIdd, setExamIdd] = useState(examId);
  useEffect(() => {
    setExamIdd(examId);
  }, [examId]);

  console.log(examIdd, 'examId');

  const examCorrection = userExamCorectionContent?.correction_exam_content;

  // const exam = userDetails?.classe.exam_classe.find((item: any) => item.id === examId);
  // console.log(exam);

  const examContent = userDetails;
  console.log(examId);
  const { data: userCorrections } = useQuery({
    queryKey: ['UserExamEvalaiationss'],
    queryFn: async () => getExamCorrectionById2(examId, classe_id),
    retry: true,
  });
  console.log(userCorrections);
  const getDetailsOfExercice = (id: string, examCorrection: any, userCorrection: any) => {
    if (!userCorrection) {
      return null;
    }
    let resultOfArray = [] as any;

    let realMark = getNoteOf(id, examContent) === null ? 0 : getNoteOf(id, examContent);

    const result = userCorrection.map((item: any) => {
      console.log(item.correction_exam_content);

      const mark = getNoteOf(id, item.correction_exam_content);
      console.log(mark);
      if (mark > realMark / 2) {
        resultOfArray.push(mark);
      }
    });
    console.log(resultOfArray);
    const porsentageResult =
      ((resultOfArray.length / userCorrection.length) * 100).toFixed(2) + '%';
    return porsentageResult;
  };
  const renderExericeTable = (obj: any, depth: number, index: number) => {
    console.log(depth, 'depth');
    const TotalMark = calcSumOfMarks(obj);
    const result = examCorrection && calcSumOfMarks(examCorrection[index]);

    return (
      <>
        <thead className="text-white">
          <tr>
            {depth === 1 && (
              <>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
              </>
            )}
            {depth === 2 && (
              <>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
              </>
            )}
            {depth > 2 && (
              <>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N2</th>
                <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
                <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <>
            {obj?.children?.map((item: any, index: number) => (
              // <tr key={index}>
              <>
                {depth === 1 && (
                  <tr>
                    <td className="p-2 border border-black/50">{item.name}</td>{' '}
                    <td className="p-2 border border-black/50">{item.mark}</td>
                    <td className="p-2 border border-black/50">
                      {getNoteOf(item.id, examCorrection) === null
                        ? 0
                        : getNoteOf(item.id, examCorrection)}
                    </td>
                    <td className="p-2 border border-black/50">
                      {getDetailsOfExercice(item.id, examCorrection, userCorrections)}
                    </td>
                  </tr>
                )}
                {depth === 2 &&
                  item?.children?.map((subItem: any, subIndex: number) => (
                    <tr>
                      <td className="p-2 border border-black/50" key={subIndex}>
                        {item.name}
                      </td>
                      <td className="p-2 border border-black/50">{subItem.name}</td>

                      <td className="p-2 border border-black/50">{subItem.mark}</td>
                      <td className="p-2 border border-black/50">
                        {getNoteOf(subItem.id, examCorrection) === null
                          ? 0
                          : getNoteOf(subItem.id, examCorrection)}
                      </td>
                      <td className="p-2 border border-black/50">
                        {getDetailsOfExercice(subItem.id, examCorrection, userCorrections)}
                      </td>
                    </tr>
                  ))}
                {depth === 3 &&
                  item?.children?.map((subItem: any, subIndex: number) =>
                    subItem?.children?.map((subSubItem: any, subSubIndex: number) => (
                      <tr>
                        <td className="p-2 pb-[10px] border border-black/50" key={subIndex}>
                          {item.name}
                        </td>
                        <td className="p-2 pb-[10px] border border-black/50"> {subItem.name}</td>

                        <td className="p-2 pb-[10px] border border-black/50">{subSubItem.name}</td>
                        <td className="p-2 pb-[10px] border border-black/50">{subSubItem.mark}</td>
                        <td className="p-2 pb-[10px] border border-black/50">
                          {getNoteOf(subSubItem.id, examCorrection) === null
                            ? 0
                            : getNoteOf(subSubItem.id, examCorrection)}
                        </td>
                        <td className="p-2 pb-[10px] border border-black/50">
                          {/* {getNoteOf(subSubItem.id, examCorrection) === null
                            ? '0.00%'
                            : (
                                (getNoteOf(subSubItem.id, examCorrection) / subSubItem.mark) *
                                100
                              ).toFixed(2) + '%'} */}
                          {getDetailsOfExercice(subSubItem.id, examCorrection, userCorrections)}
                        </td>
                      </tr>
                    ))
                  )}
              </>
            ))}
            <tr>
              <td
                colSpan={depth}
                className="p-2 border border-black/50 bg-[#9DD60026] text-[#4C4C4D] pb-[10px]"
              >
                Total
              </td>
              <td className="p-2 border border-black/50 bg-[#9DD60026] text-[#4C4C4D] pb-[10px]">
                {TotalMark}
              </td>
              <td className="p-2 pb-[10px] border border-black/50 bg-[#9DD60026] text-[#4C4C4D]">
                {result}
              </td>
              <td className="p-2  pb-[10px] border border-black/50 bg-[#9DD60026] text-[#4C4C4D]">
                {result === 0 ? '0%' : ((result / TotalMark) * 100).toFixed(2) + '%'}
              </td>
            </tr>
          </>
        </tbody>
      </>
    );
  };
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return (
    <div>
      <PdfHeader
        meta={{
          // estab: estab[0].name,
          heading: 'Fiche d évaluation',
          session: currentYear + '-' + nextYear,
          term: {
            type: user?.term,
            number: 2,
          },
          classe: 'Bac math 2',
          fullName: userDetails?.name,
          teacherName: user?.name,
          // range: 1,
          // average: 15.57,
        }}
        type="MSStudent"
      />
      <div className="flex flex-wrap justify-center gap-12">
        {examContent?.map((exercise: any, i: number) => (
          <div key={i} className="flex flex-col gap-[10px]">
            <span>{exercise?.name}</span>
            <table className="text-center w-[200px] border border-black/50 ">
              {renderExericeTable(exercise, getMaxDepth(exercise), i)}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
