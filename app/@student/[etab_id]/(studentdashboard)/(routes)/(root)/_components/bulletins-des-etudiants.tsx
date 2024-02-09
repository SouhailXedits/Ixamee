'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import BulletinsStudentList from './bulletins-student-list';
import Rien from './Rien';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getUserCorrectionBySubject } from '@/actions/exam-correction';
import ExamCorrectionList from './ExamCorrections';

const BulletinsDesEtudiants = ({ data }: any) => {
  const [filter, setFilter] = useState({
    subject_id: '',
    term: '',
  });
  const params = useParams();
  const { etab_id: classeId } = params;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  const userSubjects = queryClient.getQueryData(['user-subjects-dash', classeId]) as any;
  const { data: userCorrections } = useQuery({
    queryKey: ['correction', filter],
    queryFn: async () => getUserCorrectionBySubject(user?.id, filter),
  });
  console.log(userSubjects);
  if (!userSubjects) return null;
  return (
    <>
      {!data ? (
        <div className="flex items-center justify-center w-full h-full p-10 border rounded-xl">
          <Rien
            image="/dashboard/books.svg"
            className="flex flex-col justify-center gap-6"
            message="Pas de bulletins pour le moment"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-3">
            {/* Classe */}
            <Select
              value={filter.subject_id}
              onValueChange={(value) => setFilter({ ...filter, subject_id: value })}
            >
              <SelectTrigger className="w-[140px] rounded-xl text-11">
                <SelectValue placeholder="Matière" />
              </SelectTrigger>
              <SelectContent>
                {userSubjects &&
                  userSubjects?.map((subject: any) => (
                    <SelectItem
                      value={subject.id}
                      // onClick={() => handleInputChange('term', 'trimestre_1')}
                    >
                      {subject.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              value={filter.term}
              onValueChange={(value) => setFilter({ ...filter, term: value })}
            >
              <SelectTrigger className="w-[140px] rounded-xl text-11">
                <SelectValue placeholder="session" />
              </SelectTrigger>
              {user?.term === 'TRIMESTRE' ? (
                <SelectContent>
                  <SelectItem
                    value="trimestre_1"
                    // onClick={() => handleInputChange('term', 'trimestre_1')}
                  >
                    Trimestre 1
                  </SelectItem>
                  <SelectItem
                    value="trimestre_2"
                    // onClick={() => handleInputChange('term', 'trimestre_2')}
                  >
                    Trimestre 2
                  </SelectItem>
                  <SelectItem
                    value="trimestre_3"
                    // onClick={() => handleInputChange('term', 'trimestre_3')}
                  >
                    Trimestre 3
                  </SelectItem>
                </SelectContent>
              ) : (
                <SelectContent>
                  <SelectItem
                    value="semestre_1"
                    // onClick={() => handleInputChange('term', 'semestre_1')}
                  >
                    Semestre 1
                  </SelectItem>
                  <SelectItem
                    value="semestre_2"
                    // onClick={() => handleInputChange('term', 'semestre_2')}
                  >
                    Semestre 2
                  </SelectItem>
                </SelectContent>
              )}
            </Select>
          </div>
          <div className="w-full border h-[250px] rounded-xl">
            <ExamCorrectionList data={userCorrections} />
          </div>
        </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
