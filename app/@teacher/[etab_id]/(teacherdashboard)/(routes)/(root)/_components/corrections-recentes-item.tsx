import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';
import { AddExameModal } from '@/components/modals/addExamesModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExamsNameAndId } from '@/actions/examens';
import { useMemo, useState } from 'react';
import { getAllExamCorrections } from '@/actions/exam-correction';
import BulletinsStudentList from './bulletins-student-list';
import { getCorrectionOfUser } from '@/actions/mark-sheets/actions';
import { getCorigeExameContentOfAllUser, getStudentOfClasse } from '@/actions/classe';
import ExamCorrectionList from './exam-correction-list';
const CorrectionsRecentes = ({ etabId, classes }: any) => {
  console.log(etabId);
  console.log(classes);

  const [filters, setFilters] = useState({
    exam_id: '',
    classe_id: '',
  });
  console.log(filters);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const userId = user?.id;
  const userClasses = classes;
  const classe_id = filters.classe_id;
  const { data: userExams } = useQuery({
    queryKey: ['user-exams', filters.classe_id],

    queryFn: async () =>
      await getAllExamsNameAndId({ user_id: userId, etab_id: etabId, classe_id }),
  });

  const { data: userCorrection, isPending: isPendingUser } = useQuery({
    queryKey: ['userCorrection', filters.exam_id, filters.classe_id],
    queryFn: async () => await getCorrectionOfUser(filters.classe_id, data, filters.exam_id),
    retry: 0,
  });

  // get the student of classe  : hadi bach tjiblna el student mta3 el classe
  const { data, isPending: isPendingUserOfClasses } = useQuery({
    queryKey: ['userOfClasses', filters.classe_id],
    queryFn: async () => await getStudentOfClasse(+filters.classe_id),
    retry: 0,
  });
  console.log(userCorrection);
  console.log(data);

  const getIdOfUserInTheClasse = queryClient.getQueryData(['getIdOfUserInTheClasse']) as any;

  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent', filters.exam_id],
    queryFn: async () =>
      await getCorigeExameContentOfAllUser(filters.exam_id, getIdOfUserInTheClasse),
  });
  const newData = useMemo(() => {
    return data?.map((item: any) => ({
      ...item,
      correctionExamOfUser: getCorrigeExamOfUser,
      status:
        userCorrection?.find((user: any) => user?.user_id === item?.id)?.status || 'notCorrected',
    }));
  }, [data, userCorrection]);
  console.log(newData);
  return (
    <>
      {!newData ? (
        <>
          <div className="flex items-center justify-end gap-3">
            {/* Devoir */}
            <Select
              value={filters.classe_id}
              onValueChange={(value) => setFilters({ ...filters, classe_id: value })}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11">
                <SelectValue className="text-sm" placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                {userClasses &&
                  userClasses?.map((classe: any) => (
                    <SelectItem key={classe.id} value={classe.id}>
                      {classe.name}
                    </SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
            <Select
              value={filters.exam_id}
              onValueChange={(value) => setFilters({ ...filters, exam_id: value })}
              disabled={!filters.classe_id}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11">
                <SelectValue className="text-sm" placeholder="examan" />
              </SelectTrigger>
              <SelectContent>
                {userExams && userExams.length > 0
                  ? userExams.map((exam: any) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.name}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-10 border rounded-xl">
            <Rien
              image="/dashboard/books.svg"
              className="flex flex-col justify-center gap-6"
              message="Pas de bulletins pour le moment"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-3">
            {/* Devoir */}
            <Select
              value={filters.classe_id}
              onValueChange={(value) => setFilters({ ...filters, classe_id: value })}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11">
                <SelectValue className="text-sm" placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                {userClasses &&
                  userClasses?.map((classe: any) => (
                    <SelectItem key={classe.id} value={classe.id}>
                      {classe.name}
                    </SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
            <Select
              value={filters.exam_id}
              onValueChange={(value) => setFilters({ ...filters, exam_id: value })}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11">
                <SelectValue className="text-sm" placeholder="examan" />
              </SelectTrigger>
              <SelectContent>
                {userExams?.length &&
                  userExams?.map((exam: any) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
            <div className="w-full overflow-auto border rounded-xl"><ExamCorrectionList data={newData} /></div>
        </div>
      )}
    </>
  );
};

export default CorrectionsRecentes;
