'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import CorrectionsRecentes from './corrections-recentes-item';
import BulletinsDesEtudiants from './bulletins-des-etudiants';
import { getUserCorrectionBySubject } from '@/actions/exam-correction';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const DashboradBulletinsDesEtudiants = ({ data }: any) => {
  const [filter, setFilter] = useState({
    subject_id: '',
    term: '',
  });
  const params = useParams();
  const { etab_id: classeId } = params;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  const userSubjects = queryClient.getQueryData(['user-subjects', classeId]) as any;
  const { data: userCorrections } = useQuery<any>({
    queryKey: ['correction', filter],
    queryFn: async () => getUserCorrectionBySubject(user?.id, filter),
  });

  return (
    <div className="flex flex-col gap-4 h-[500px]">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Image src="dashboard/bulttin/bulletinsIcon.svg" alt="correct" width={21} height={21} />
          <span className=" text-[#727272] text-xl font-[600] ">Mes bulletins</span>
        </div>
        {userCorrections?.length > 0 && (
          <div className="text-[#1B8392] cursor-pointer text-lg font-medium  underline">
            Voir plus
          </div>
        )}
      </div>
      <div className="flex flex-col h-full gap-4">
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
                    key={subject.id}
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
        <div className="w-full rounded-xl">
          <BulletinsDesEtudiants userCorrections={userCorrections} />
        </div>
      </div>
    </div>
  );
};

export default DashboradBulletinsDesEtudiants;
