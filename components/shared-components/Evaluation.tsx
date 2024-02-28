'use client';
import PdfHeader from '@/components/shared-components/PdfHeader';
import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getMaxDepth, getNoteOf } from '@/app/_utils/calculateChildrenMarks';
import { calcSumOfMarks } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/[examenId]/_components/sharedFunction';

export default function Evaluation({ userContent, userDetails }: any) {
  const params = useParams();

  if (!userContent?.correction_exam_content) {
    return null;
  }

  // Logging for debugging
  const queryClient = useQueryClient();

  const etab_id = queryClient.getQueryData(['AllEstabOfUser']) as any;

  const classeName = queryClient.getQueryData(['classeName', +params.etab_id]) as any;

  const user = queryClient.getQueryData(['user']) as any;

  // const estab = teacherEstab?.filter((item: any) => {
  //   return item.id == etab_id;
  // });

  const examCorrection = userContent?.correction_exam_content;

  // const exam = userDetails?.classe.exam_classe.find((item: any) => item.id === examId);

  const examContent = userDetails;
  console.log(examContent);

  const maxDepth = getMaxDepth(examContent?.[1]);

  const renderExericeTable = (obj: any, depth: number, index: number) => {
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
                      {getNoteOf(item.id, examCorrection) === null
                        ? '0.00%'
                        : ((getNoteOf(item.id, examCorrection) / item.mark) * 100).toFixed(2) + '%'}
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
                        {getNoteOf(subItem.id, examCorrection) === null
                          ? '0.00%'
                          : ((getNoteOf(subItem.id, examCorrection) / subItem.mark) * 100).toFixed(
                              2
                            ) + '%'}
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
                          {getNoteOf(subSubItem.id, examCorrection) === null
                            ? '0.00%'
                            : (
                                (getNoteOf(subSubItem.id, examCorrection) / subSubItem.mark) *
                                100
                              ).toFixed(2) + '%'}
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
          estab: etab_id[0]?.name,
          heading: 'Fiche d évaluation',
          session: currentYear + '-' + nextYear,
          term: {
            type: user?.term,
            number: 2,
          },
          classe: classeName && classeName[0]?.name,
          fullName: user?.name,
          // teacherName: user?.name,
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
