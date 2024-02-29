'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BulletinsStudentList from './bulletins-student-list';
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClassesNameAndIdDash } from '@/actions/classe';
import { get } from 'http';
import { getAllExamsNameAndId } from '@/actions/examens';
import { useState } from 'react';
import { getAllExamCorrections } from '@/actions/exam-correction';

const BulletinsDesEtudiants = ({ data, etabId, classes }: any) => {
  const [filters, setFilters] = useState({
    exam_id: '',
    classe_id: '',
  });

  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;
  const userId = user?.id;

  // const { data: userClasses } = useQuery({
  //   queryKey: ['user-classes'],
  //   queryFn: async () => await getAllClassesNameAndIdDash({ user_id: userId, etab_id: etabId }),
  // });
  console.log(filters);
  const userClasses = classes;
  console.log(userClasses);
  const classe_id = filters.classe_id;
  console.log(classe_id, etabId);

  const { data: userExams } = useQuery({
    enabled: filters.classe_id !== '' ,
    queryKey: ['userExams', filters.classe_id],
    queryFn: async () =>
      await getAllExamsNameAndId({
        user_id: userId,
        etab_id: etabId,
        classe_id: filters.classe_id,
      }),
  });
  console.log(userExams);
  // data = ['zegzeg']
  const { data: tableData } = useQuery<any>({
    queryKey: ['users-results', filters],
    queryFn: async () => await getAllExamCorrections(filters, userId),
  });

  return (
    <>
      {!tableData?.length ? (
        <>
          <div className="flex items-center justify-end gap-3 max-md:w-full">
            {/* Devoir */}
            <Select
              value={filters.classe_id}
              onValueChange={(value) => setFilters({ ...filters, classe_id: value })}
              disabled={userClasses?.length === 0}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11 max-md:w-full">
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
              disabled={!userExams}
            >
              <SelectTrigger className="w-1/4 rounded-xl text-11 max-md:w-full">
                <SelectValue className="text-sm" placeholder="examan" />
              </SelectTrigger>
              <SelectContent>
                {userExams?.map((exam: any) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
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
          <div className="w-full overflow-auto border rounded-xl">
            <BulletinsStudentList
              data={tableData}
              nameClasse={userClasses.find((classe: any) => classe.id === filters.classe_id).name}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
