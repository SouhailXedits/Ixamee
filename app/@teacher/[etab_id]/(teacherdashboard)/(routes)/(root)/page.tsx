'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import DashboradStatistiques from './_components/dashborad-statistiques';
import { getCountOfClasse, getCountOfExamenes, getCountMonArchive } from '@/actions/dashboard';
import {
  getAllClasseByPage,
  getAllClasseName,
  getCorrectionOfUser,
  getStudentClassCount,
} from '@/actions/classe';
import Loading from '@/app/loading';

export default function Home() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const etab_id = queryClient.getQueryData(['etab_id']) as any;

  const { data: classeCount, isPending: classeCountPending } = useQuery({
    queryKey: ['dashClasseCount'],
    queryFn: async () => await getCountOfClasse(user?.id, etab_id),
  });

  const { data: examCount, isPending: examCountPending } = useQuery({
    queryKey: ['dashExamCount'],
    queryFn: async () => await getCountOfExamenes(user?.id, etab_id),
  });

  const { data: archiveCount, isPending: archiveCountPending } = useQuery({
    queryKey: ['dashArchiveCount'],
    queryFn: async () => await getCountMonArchive(user?.id, etab_id),
  });

  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['dashClasses'],
    queryFn: async () => await getAllClasseByPage({ user_id: user?.id, etab_id }),
  });
  const { data: studentCount, isPending: isPendingStudentClasse } = useQuery<any>({
    queryKey: ['dashStudentClasses'],
    queryFn: async () => await getStudentClassCount({ user_id: user?.id, etab_id }),
  });
  const { data: classesName, isPending: isPendingClassesName } = useQuery<any>({
    queryKey: ['dashClassesName'],
    queryFn: async () => await getAllClasseName({ user_id: user?.id, etab_id }),
  });
  return isPendingStudentClasse ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full h-full p-9">
      <div className="text-2 text-2xl font-[500] pl-4 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-6 w-[60%] max-2xl:w-[100%] ">
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
          <DashboradStatistiques
            classesName={classesName}
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

        <div className="w-[40%] h-full p-2 flex flex-col gap-6 max-2xl:w-[100%]">
          <DashboradCorrectionsRecentes etabId={etab_id} />
          <DashboradBulletinsDesEtudiants etabId={etab_id} />
        </div>
      </div>
    </div>
  );
}
