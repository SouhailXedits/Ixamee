"use client"
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

const BulletinsDesEtudiants = ({ data, etabId , classes}: any) => {
  const [filters, setFilters] = useState({
    exam_id: '',
    classe_id: ''
  })
  
  const queryClient = useQueryClient();
  // console.log()
  const user = queryClient.getQueryData(['user']) as any
  const userId = user?.id 
  console.log(userId, etabId)
  // const { data: userClasses } = useQuery({
  //   queryKey: ['user-classes'],
  //   queryFn: async () => await getAllClassesNameAndIdDash({ user_id: userId, etab_id: etabId }),
  // });
  const userClasses = classes;
  const { data: userExams } = useQuery({
    queryKey: ['user-exams'],
    queryFn: async () => await getAllExamsNameAndId({ user_id: userId, etab_id: etabId }),
  });
  // data = ['zegzeg']
  const { data: tableData } = useQuery<any>({
    queryKey: ['users-results', filters],
    queryFn: async() => await getAllExamCorrections(filters, userId)
  });

  console.log(tableData)

  
  return (
    <>
      {!tableData?.length ? (
        <>
          <div className="flex items-center justify-end gap-3">
            {/* Devoir */}
            <Select
              value={filters.classe_id}
              onValueChange={(value) => setFilters({ ...filters, classe_id: value })}
            >
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                {userClasses &&
                  userClasses?.map((classe: any) => (
                    <SelectItem value={classe.id}>{classe.name}</SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
            <Select
              value={filters.exam_id}
              onValueChange={(value) => setFilters({ ...filters, exam_id: value })}
            >
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="examan" />
              </SelectTrigger>
              <SelectContent>
                {userExams?.length &&
                  userExams?.map((exam: any) => (
                    <SelectItem value={exam.id}>{exam.name}</SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col w-full border h-full rounded-xl items-center justify-center p-10">
            <Rien
              image="/dashboard/books.svg"
              className="flex flex-col gap-6 justify-center"
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
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                {userClasses &&
                  userClasses?.map((classe: any) => (
                    <SelectItem value={classe.id}>{classe.name}</SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
            <Select
              value={filters.exam_id}
              onValueChange={(value) => setFilters({ ...filters, exam_id: value })}
            >
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="examan" />
              </SelectTrigger>
              <SelectContent>
                {userExams?.length &&
                  userExams?.map((exam: any) => (
                    <SelectItem value={exam.id}>{exam.name}</SelectItem>
                  ))}
                {/* <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full border rounded-xl overflow-auto">
            <BulletinsStudentList data={tableData} nameClasse={userClasses.find((classe:any) => classe.id === filters.classe_id).name} />
          </div>
        </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
