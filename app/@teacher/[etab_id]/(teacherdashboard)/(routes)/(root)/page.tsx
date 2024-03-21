'use client';
import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import { getCountOfClasse, getCountOfExamenes, getCountMonArchive } from '@/actions/dashboard';
import { getAllClasseByPage, getAllClassesNameAndId, getStudentClassCount } from '@/actions/classe';
import Loading from '@/app/loading';
import DashboradStatistiques from './_components/dashborad-statistiques';

export default function Home() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const etab_id = queryClient.getQueryData(['etab_id']) as any;

  const getDashClasseCount = (): Promise<number> => getCountOfClasse(user?.id, etab_id);
  const getDashExamCount = (etab_id: number): Promise<number> => getCountOfExamenes(user?.id, etab_id);
  const getDashArchiveCount = (etab_id: number): Promise<number> => getCountMonArchive(user?.id, etab_id);
  const getDashClasses = (): Promise<any> => getAllClasseByPage({ user_id: user?.id, etab_id });
  const getDashStudentClasses = (etab_id: number): Promise<any> => getStudentClassCount({ user_id: user?.id, etab_id });
  const getDashClassesNameAndId = (): Promise<any> => getAllClassesNameAndId({ user_id: user?.id, etab_id });

  const getQueryOptions = <T>(queryFn: () => Promise<T>, queryKey: (string | number)[]): UseQueryOptions<T> => ({
    queryKey,
    queryFn,
    onError: (error: any) => console.error(`Error in query: ${queryKey.join('.')}`, error),
    select: (data) => ({ data, isLoading: !data }),
  });

  const { data: classeCount, isLoading: classeCountLoading } = useQuery<number>(
    ['dashClasseCount'],
    getDashClasseCount
  );

  const { data: examCount, isLoading: examCountLoading } = useQuery<number>(
    ['dashExamCount', etab_id],
    () => getDashExamCount(etab_id),
    getQueryOptions(getDashExamCount, ['dashExamCount', etab_id])
  );

  const { data: archiveCount, isLoading: archiveCountLoading } = useQuery<number>(
    ['dashArchiveCount', etab_id],
    () => getDashArchiveCount(etab_id),
    getQueryOptions(getDashArchiveCount, ['dashArchiveCount', etab_id])
  );

  const { data: classe, isLoading: isLoadingClasse } = useQuery<any>(
    ['dashClasses', etab_id],
    getDashClasses,
    getQueryOptions(getDashClasses, ['dashClasses', etab_id])
  );

  const { data: studentCount, isLoading: isLoadingStudentClasse } = useQuery<any>(
    ['dashStudentClasses', etab_id],
    () => getDashStudentClasses(etab_id),
    getQueryOptions(getDashStudentClasses, ['dashStudentClasses', etab_id])
  );

  const { data: classes, isLoading: isLoadingClasses } = useQuery<any>(
    ['classes', etab_id],
    getDashClassesNameAndId,
    getQueryOptions(getDashClassesNameAndId, ['classes', etab_id])
  );

  if (isLoadingStudentClasse) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full overflow-auto p-9">
      <div className="text-2 text-2xl font-[500] pl-4 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-6 w-[60%] max-2xl:w-[100%] ">
          <DashboradApercu
            classeCount={classeCount}
            examCount={examCount}
            archiveCount={archiveCount}
            classeCountPending={classeCountLoading}
            examCountPending={examCountLoading}
            archiveCountPending={archiveCountLoading}
            studentCount={studentCount?.data}
            studentCountPending={isLoadingStudentClasse}
          />
          <DashboradStatistiques
            isPendingClasses={isLoadingClasses}
            classes={classes?.data}
            allStudentCount={studentCount?.data}

