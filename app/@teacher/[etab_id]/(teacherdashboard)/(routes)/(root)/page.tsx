'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import { getCountOfClasse, getCountOfExamenes, getCountMonArchive } from '@/actions/dashboard';
import { getAllClasseByPage, getAllClassesNameAndId, getStudentClassCount } from '@/actions/classe';
import Loading from '@/app/loading';
import DashboradStatistiques from './_components/dashborad-statistiques';
import { useEffect, useState } from 'react';

export default function Home() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const etab_id = queryClient.getQueryData(['etab_id']) as any;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data: classeCount, isPending: classeCountPending } = useQuery({
    queryKey: ['dashClasseCount'],
    queryFn: async () => await getCountOfClasse(user?.id, etab_id),
  });

  const { data: examCount, isPending: examCountPending } = useQuery({
    queryKey: ['dashExamCount', etab_id],
    queryFn: async () => await getCountOfExamenes(user?.id, etab_id),
  });

  const { data: archiveCount, isPending: archiveCountPending } = useQuery({
    queryKey: ['dashArchiveCount', etab_id],
    queryFn: async () => await getCountMonArchive(user?.id, etab_id),
  });

  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['dashClasses', etab_id],
    queryFn: async () => await getAllClasseByPage({ user_id: user?.id, etab_id }),
  });
  const { data: studentCount, isPending: isPendingStudentClasse } = useQuery<any>({
    queryKey: ['dashStudentClasses', etab_id],
    queryFn: async () => await getStudentClassCount({ user_id: user?.id, etab_id }),
  });

  const { data: classes, isPending: isPendingClasses } = useQuery({
    queryKey: ['classess', etab_id],
    queryFn: async () => await getAllClassesNameAndId({ user_id: user?.id, etab_id }),
  });

  return isPendingStudentClasse ? (
    <Loading />
  ) : (
    <div className={`flex flex-col w-full overflow-auto p-9 `}>
      <div className="text-2 text-2xl font-[500] pl-4 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        <div className={`flex flex-col gap-6 w-[60%] max-2xl:w-[100%] `}>
          <div className={`${animate ? 'animate' : ''}`}>
            <DashboradApercu
              classeCount={classeCount}
              examCount={examCount}
              archiveCount={archiveCount}
              classeCountPending={classeCountPending}
              examCountPending={examCountPending}
              archiveCountPending={archiveCountPending}
              studentCount={studentCount?.data}
              studentCountPending={isPendingStudentClasse}
            />
          </div>
          <div className={`flex flex-col gap-6 w-full ${animate ? 'animate-btt' : ''}`}>
            <DashboradStatistiques
              isPendingClasses={isPendingClasses}
              classes={classes?.data}
              allStudentCount={studentCount?.data}
              studentCountPending={isPendingStudentClasse}
            />
            <DashboradClasses
              classe={classe?.data}
              classeCount={classeCount}
              isPending={isPendingClasse}
              etabId={etab_id}
            />
          </div>
        </div>

        <div
          className={`w-[40%] h-full p-2 flex flex-col gap-6 max-2xl:w-[100%] ${
            animate ? 'animate-rtl' : ''
          } `}
        >
          <DashboradCorrectionsRecentes etabId={etab_id} classes={classes?.data} />
          <DashboradBulletinsDesEtudiants etabId={etab_id} classes={classes?.data} />
        </div>
      </div>
    </div>
  );
}
