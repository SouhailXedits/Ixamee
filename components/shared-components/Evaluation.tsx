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
import {
  getDetailsOfAllExercice,
  getDetailsOfExercice,
} from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/_components/getDetailsOfExam';
import { getMarkOfExerciceWithId } from '@/app/_utils/calculateChildrenMarks';
import PdfHeaderEvatuation from './PdfHeaderEvalution';

export default function Evaluation({
  userExamCorectionContent,
  userDetails,
  user_id,
  examDetails,
}: any) {
  if (!userExamCorectionContent) {
    return null;
  }

  const allExamUserDetails = examDetails?.examCorrection;

  const [examCorrection] = userExamCorectionContent[0]?.correction_exam_content;

  const params = useParams();
  const sumOfMarks = allExamUserDetails.reduce(
    (acc: any, item: any) => acc + item.mark_obtained,
    0
  );

  const classe_id = params.etab_id as string;
  // Count
  const averageMark = (sumOfMarks / allExamUserDetails.length).toFixed(2);
  const minMoyene = Math.min(...allExamUserDetails.map((item: any) => item.mark_obtained));
  const maxMoyene = Math.max(...allExamUserDetails.map((item: any) => item.mark_obtained));
  const countSupTen = allExamUserDetails.filter((x: any) => x.mark_obtained > 10).length;
  const countInfTen = allExamUserDetails.filter((x: any) => x.mark_obtained < 10).length;
  // Logging for debugging
  const queryClient = useQueryClient();

  const totalMark = allExamUserDetails.find((item: any) => item?.user_id === user_id);

  const realNote = totalMark?.mark_obtained + '/' + examDetails?.totalScore;

  // const etab_id = queryClient.getQueryData(['etab_id']) as any;
  const teacherEstab = queryClient.getQueryData(['AllEstabOfUser']) as any;
  const user = queryClient.getQueryData(['user']) as any;
  const classeNames = queryClient.getQueryData(['user-classes']) as any;
  const teacherName = queryClient?.getQueryData(['TeacherName', +params.subject_id]) as any;
  const classeName = classeNames?.find((item: any) => item.id === +params.etab_id);
  const examId = userExamCorectionContent[0]?.exam_id;

  const examContent = userDetails;
  const { data: userCorrections } = useQuery({
    queryKey: ['UserExamEvalaiationss', examId, classe_id],
    queryFn: async () => getExamCorrectionById2(examId, classe_id),
    retry: true,
  });
  const renderExericeTable = (obj: any, depth: number, index: number) => {
    const TotalMark = calcSumOfMarks(obj);

    const result = Array.isArray(examCorrection)
      ? examCorrection && calcSumOfMarks(examCorrection[index])
      : calcSumOfMarks(examCorrection);

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
                      {getMarkOfExerciceWithId(examCorrection, item.id) === null
                        ? 0
                        : getMarkOfExerciceWithId(examCorrection, item.id)}
                    </td>
                    <td className="p-2 border border-black/50">
                      {getDetailsOfExercice(item.id, examCorrection, userCorrections, examContent)}
                    </td>
                  </tr>
                )}
                {/* {depth === 2 &&
                  item?.children?.map((subItem: any, subIndex: number) => (
                    <tr>
                      <td className="p-2 border border-black/50" key={subIndex}>
                        {item.name}
                      </td>
                      <td className="p-2 border border-black/50">{subItem.name}</td>

                      <td className="p-2 border border-black/50">{subItem.mark}</td>
                      <td className="p-2 border border-black/50">
                        {getMarkOfExerciceWithId(examCorrection, subItem.id) === null
                          ? 0
                          : getMarkOfExerciceWithId(examCorrection, subItem.id)}
                      </td>
                      <td className="p-2 border border-black/50">
                        {getDetailsOfExercice(
                          subItem.id,
                          examCorrection,
                          userCorrections,
                          examContent
                        )}
                      </td>
                    </tr>
                  ))} */}
                {depth === 2 &&
                  (item.children?.length === 0 ? (
                    <tr key={index}>
                      <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                      <td className="p-2 pb-[10px] border border-black/50"> </td>

                      <td className="p-2 pb-[10px] border border-black/50">{item.mark}</td>
                      <td className="p-2 pb-[10px] border border-black/50">
                        {getMarkOfExerciceWithId(examCorrection, item.id) === null
                          ? 0
                          : getMarkOfExerciceWithId(examCorrection, item.id)}
                      </td>
                      <td className="p-2 pb-[10px] border border-black/50">
                        {getDetailsOfExercice(
                          item.id,
                          examCorrection,
                          userCorrections,
                          examContent
                        )}
                      </td>
                    </tr>
                  ) : (
                    item?.children?.map((subItem: any, subIndex: number) => {
                      if (subItem?.children?.length === 0) {
                        return (
                          <tr key={subIndex}>
                            <td className="p-2 pb-[10px] border border-black/50"></td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {' '}
                              {subItem.name}
                            </td>

                            <td className="p-2 pb-[10px] border border-black/50">{subItem.mark}</td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getMarkOfExerciceWithId(examCorrection, subItem.id) === null
                                ? 0
                                : getMarkOfExerciceWithId(examCorrection, subItem.id)}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getDetailsOfExercice(
                                subItem.id,
                                examCorrection,
                                userCorrections,
                                examContent
                              )}
                            </td>
                          </tr>
                        );
                      }
                      // return subItem?.children?.map((subSubItem: any, subSubIndex: number) => {
                      //
                      //   return (
                      //     <tr key={subSubIndex}>
                      //       <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                      //       <td className="p-2 pb-[10px] border border-black/50">
                      //         {subItem.name}
                      //       </td>
                      //       <td className="p-2 pb-[10px] border border-black/50">
                      //         {subSubItem.name}
                      //       </td>
                      //       <td className="p-2 pb-[10px] border border-black/50">
                      //         {subSubItem.mark}
                      //       </td>
                      //       <td className="p-2 pb-[10px] border border-black/50">
                      //         {getMarkOfExerciceWithId(examCorrection, subSubItem.id) === null
                      //           ? 0
                      //           : getMarkOfExerciceWithId(examCorrection, subSubItem.id)}
                      //       </td>
                      //       <td className="p-2 pb-[10px] border border-black/50">
                      //         {getDetailsOfExercice(
                      //           subSubItem.id,
                      //           examCorrection,
                      //           userCorrections,
                      //           examContent
                      //         )}
                      //       </td>
                      //     </tr>
                      //   );
                      // });
                    })
                  ))}
                {depth === 3 &&
                  (item.children?.length === 0 ? (
                    <tr key={index}>
                      <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                      <td className="p-2 pb-[10px] border border-black/50"> </td>
                      <td className="p-2 pb-[10px] border border-black/50"> </td>
                      <td className="p-2 pb-[10px] border border-black/50">{item.mark}</td>
                      <td className="p-2 pb-[10px] border border-black/50">
                        {getMarkOfExerciceWithId(examCorrection, item.id) === null
                          ? 0
                          : getMarkOfExerciceWithId(examCorrection, item.id)}
                      </td>
                      <td className="p-2 pb-[10px] border border-black/50">
                        {getDetailsOfExercice(
                          item.id,
                          examCorrection,
                          userCorrections,
                          examContent
                        )}
                      </td>
                    </tr>
                  ) : (
                    item?.children?.map((subItem: any, subIndex: number) => {
                      if (subItem?.children?.length === 0) {
                        return (
                          <tr key={subIndex}>
                            <td className="p-2 pb-[10px] border border-black/50"></td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {' '}
                              {subItem.name}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50"> </td>
                            <td className="p-2 pb-[10px] border border-black/50">{subItem.mark}</td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getMarkOfExerciceWithId(examCorrection, subItem.id) === null
                                ? 0
                                : getMarkOfExerciceWithId(examCorrection, subItem.id)}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getDetailsOfExercice(
                                subItem.id,
                                examCorrection,
                                userCorrections,
                                examContent
                              )}
                            </td>
                          </tr>
                        );
                      }
                      return subItem?.children?.map((subSubItem: any, subSubIndex: number) => {
                        return (
                          <tr key={subSubIndex}>
                            <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                            <td className="p-2 pb-[10px] border border-black/50">{subItem.name}</td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {subSubItem.name}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {subSubItem.mark}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getMarkOfExerciceWithId(examCorrection, subSubItem.id) === null
                                ? 0
                                : getMarkOfExerciceWithId(examCorrection, subSubItem.id)}
                            </td>
                            <td className="p-2 pb-[10px] border border-black/50">
                              {getDetailsOfExercice(
                                subSubItem.id,
                                examCorrection,
                                userCorrections,
                                examContent
                              )}
                            </td>
                          </tr>
                        );
                      });
                    })
                  ))}
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
                {/* {calculateClasseOverallAvg()} */}
                {/* {result === 0 ? '0%' : ((result / TotalMark) * 100).toFixed(2) + '%'} */}
                {getDetailsOfAllExercice(examCorrection, userCorrections, obj, index)}
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
      <PdfHeaderEvatuation
        meta={{
          estab: teacherEstab ? teacherEstab[0]?.name : [],
          heading: 'Fiche d évaluation',
          session: currentYear + '-' + nextYear,
          term: {
            type: user?.term,
            number: 2,
          },
          classe: classeName?.name,
          fullName: user?.name,
          teacherName: teacherName?.name,
          // range: 1,
          // average: 15.57,
          devoir: examDetails?.name,
          minMoyene: minMoyene,
          maxMoyene: maxMoyene,
          countSupTen: countSupTen,
          countInfTen: countInfTen,
          noteTotal: realNote,
          observation: totalMark.feedback,
          moyendeClasse: averageMark + '/' + examDetails?.totalScore,
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
