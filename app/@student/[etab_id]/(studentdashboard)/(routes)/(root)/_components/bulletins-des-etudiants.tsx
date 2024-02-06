'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import ExamCorrectionList from './exam-correction-list';
import BulletinsStudentList from './bulletins-student-list';
import Rien from './Rien';
import { useQueryClient } from '@tanstack/react-query';

const BulletinsDesEtudiants = ({ data }: any) => {

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  return (
    <>
      {!data ? (
        <div className="w-full border h-full rounded-xl flex items-center justify-center p-10">
          <Rien
            image="/dashboard/books.svg"
            className="flex flex-col gap-6 justify-center"
            message="Pas de bulletins pour le moment"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-3">
            {/* Classe */}
            <Select>
              <SelectTrigger className="w-[140px] rounded-xl text-11">
                <SelectValue placeholder="Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">3_eme_info</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full border h-[250px] rounded-xl overflow-auto">
          <ExamCorrectionList />
          </div>
        </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
