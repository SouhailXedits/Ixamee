'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import DashboradStatistiques from './_components/dashborad-statistiques';

import { useParams } from 'next/navigation';
import { getAllSubjectsByClasseIdByPage, getAllSubjectsCount } from '@/actions/subjects';

export default function Home() {
  const queryClient = useQueryClient();

  const examCount = queryClient.getQueryData(['examCount']) as any;
  console.log('🚀 ~ Home ~ examCount:', examCount);
  const marksheetCount = queryClient.getQueryData(['marksheetCount']) as any;
  console.log('🚀 ~ Home ~ marksheetCount:', marksheetCount);
  // const allSubjects = queryClient.getQueryData(['teacherSubject']) as any;
  const params = useParams();
  const classId = params.etab_id;
  const { data: allSubjects, isPending: allSubjectsPending } = useQuery({
    queryKey: ['user-subjectsCount', classId],
    queryFn: async () => getAllSubjectsCount(+classId),
  });

  console.log('🚀 ~ Home ~ allSubjects:', allSubjects);
  const { data: subjects, isPending } = useQuery({
    queryKey: ['user-subjects-dash', classId],
    queryFn: async () => getAllSubjectsByClasseIdByPage(2, +classId),
  });

  return (
    <div className="flex flex-col w-full h-full p-9">
      <div className="text-2 text-2xl font-semibold pl-4 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-9 w-[60%] max-2xl:w-[100%] ">
          <DashboradApercu
            subjectCount={allSubjects}
            examCount={examCount}
            marksheetCount={marksheetCount}
          />
          <DashboradStatistiques />
          <DashboradClasses
            classId={classId}
            subjects={subjects}
            isPending={isPending}
            allSubjectsCount={allSubjects}
          />
        </div>

        <div className="w-[40%] p-2 flex flex-col gap-9 max-2xl:w-[100%]">
          <DashboradCorrectionsRecentes />
          <DashboradBulletinsDesEtudiants />
        </div>
      </div>
    </div>
  );
}
