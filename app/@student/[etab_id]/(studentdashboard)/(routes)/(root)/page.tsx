'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';

import { useParams } from 'next/navigation';
import {
  getAllSubjectsByClasseId,
  getAllSubjectsByClasseIdByPage,
  getAllSubjectsCount,
} from '@/actions/subjects';
import { getStudentMarksheet } from '@/actions/dashboard';
import DashboradStatistiques from './_components/dashborad-statistiques';

export default function Home() {
  const queryClient = useQueryClient();

  const examCount = queryClient.getQueryData(['examCount']) as any;

  const marksheetCount = queryClient.getQueryData(['marksheetCount']) as any;

  // const allSubjects = queryClient.getQueryData(['teacherSubject']) as any;
  const params = useParams();
  const classId = params.etab_id as string;
  const { data: allSubjects, isPending: allSubjectsPending } = useQuery({
    queryKey: ['user-subjectsCount', classId],
    queryFn: async () => getAllSubjectsCount(+classId),
  });

  const {
    data: filtredsubjects,
    isPending: isFiltredsubjectsPending,
    error,
  } = useQuery({
    queryKey: ['user-subjects-dash', classId],
    queryFn: async () => getAllSubjectsByClasseIdByPage(2, +classId),
  });
  const {
    data: subjects,
    isPending: isSubjectPending,
    error: subjectsError,
  } = useQuery({
    queryKey: ['user-subject', classId],
    queryFn: async () => getAllSubjectsByClasseId(+classId),
  }) as any;
  console.log('🚀 ~ Home ~ subjects:', subjects);
  const teacherId = subjects && subjects[0]?.teacher[0]?.id;
  console.log('🚀 ~ Home ~ teacherId:', teacherId);
  return (
    <div className="flex flex-col w-full h-[100vh] overflow-auto p-9">
      <div className="pl-4 text-2xl font-semibold text-2 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-9 w-[60%] max-2xl:w-[100%] ">
          <DashboradApercu
            subjects={subjects}
            subjectCount={allSubjects}
            examCount={examCount}
            marksheetCount={marksheetCount}
          />
          <DashboradStatistiques isSubjectPending={isSubjectPending} subjects={subjects} />
          <DashboradClasses
            classId={classId}
            subjects={filtredsubjects}
            isSubjectPending={isFiltredsubjectsPending}
            allSubjectsCount={allSubjects}
          />
        </div>

        <div className="w-[40%]  p-2 flex flex-col gap-9 max-2xl:w-[100%]">
          <DashboradCorrectionsRecentes
            classId={classId}
            subjects={subjects}
            teacherId={teacherId}
          />
          <DashboradBulletinsDesEtudiants subjects={subjects} isSubjectPending={isSubjectPending} />
        </div>
      </div>
    </div>
  );
}
