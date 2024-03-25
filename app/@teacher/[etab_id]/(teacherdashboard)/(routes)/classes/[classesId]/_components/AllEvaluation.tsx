'use client';
import React from 'react';
import { getMaxDepth } from '../student/[student_id]/correction/[exam_id]/_components/calculateChildrenMarks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamCorrectionById } from '@/actions/exam-correction';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';

import { getNameClasseByClasseId } from '@/actions/classe';
import PdfHeaderEvatuation from '@/components/shared-components/PdfHeaderEvalution';
import { renderExericeTable } from './renderExerciceTable';

export default function Evaluation({ userExamCorectionContent, classeId, examId }: any) {
  const queryClient = useQueryClient();
  const params = useParams();

  const { data: userCorrections } = useQuery({
    queryKey: ['UserExamEvalaiations', examId, classeId],
    queryFn: async () => getExamCorrectionById(examId, classeId),
  });
  const { data: NameClasse } = useQuery({
    queryKey: ['NameClasse', classeId],
    queryFn: async () => await getNameClasseByClasseId(+classeId),
  });
  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  const user = queryClient.getQueryData(['user']) as any;

  const CorigeExameContent = queryClient.getQueryData(['CorigeExameContent', '84']) as any;

  if (!CorigeExameContent) return null;
  const sumOfMarks = CorigeExameContent?.reduce(
    (acc: any, item: any) => acc + item.mark_obtained,
    0
  );
  const averageMark = (sumOfMarks / CorigeExameContent?.length).toFixed(2);
  const minMoyene = Math.min(...CorigeExameContent?.map((item: any) => item.mark_obtained));
  const maxMoyene = Math.max(...CorigeExameContent?.map((item: any) => item.mark_obtained));
  const countSupTen = CorigeExameContent?.filter((x: any) => x.mark_obtained >= 10).length;
  const countInfTen = CorigeExameContent?.filter((x: any) => x.mark_obtained <= 10).length;

  const estab = teacherEstab?.filter((item: any) => {
    return item.id == params.etab_id;
  });

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  console.log(userExamCorectionContent);
  return (
    <div>
      {userExamCorectionContent?.map((item: any, index: number) => {
        console.log(item.correctionExamOfUser);
        const examCorrection = item?.correctionExamOfUser.find(
          (items: any) => items.user_id == item.id
        )?.correction_exam_content;
        console.log(examCorrection, 'examCorrection');
        if (!userCorrections) return null;

        const exam = item?.classe.exam_classe.find((items: any) => items.id === +examId);

        const examContent = exam?.content;

        if (!examCorrection) {
          return null;
        }
        console.log(index, 'index');
        const correctionExamOfUser = item?.correctionExamOfUser;

        const totatlMarl = correctionExamOfUser.find((items: any) => items.user_id == item.id);

        const realNote = totatlMarl?.mark_obtained + '/' + totatlMarl?.exam?.total_mark;
        const feedback = totatlMarl?.feedback;

        return (
          <div id={examCorrection ? '' : 'nextpage'}>
            <PdfHeaderEvatuation
              meta={{
                estab: estab && estab[0]?.name,
                heading: 'Fiche d évaluation',
                session: currentYear + '-' + nextYear,
                term: {
                  type: user?.term,
                  number: 2,
                },
                classe: NameClasse?.[0].name,
                fullName: item?.name,
                teacherName: user?.name,
                // range: 1,
                // average: 15.57,
                devoir: exam?.name,
                minMoyene: minMoyene,
                maxMoyene: maxMoyene,
                countSupTen: countSupTen,
                countInfTen: countInfTen,
                noteTotal: realNote,
                observation: feedback,
                moyendeClasse: averageMark + '/' + totatlMarl?.exam?.total_mark,
              }}
              type="MSStudent"
            />
            <div className="flex flex-wrap justify-center gap-12">
              {examContent?.map((exercise: any, i: number) => (
                <div key={i} className="flex flex-col gap-[10px]">
                  <span>{exercise?.name}</span>
                  <table className="text-center w-[200px] border border-black/50 ">
                    {renderExericeTable(
                      exercise,
                      getMaxDepth(exercise),
                      i,
                      examCorrection,
                      userCorrections,
                      examContent
                    )}
                  </table>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
