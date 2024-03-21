import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BulletinsStudentList from './bulletins-student-list';
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';
import { AddExameModal } from '@/components/modals/addExamesModal';

type CorrectionsRecentesProps = {
  data?: any;
  etabId: string;
  isLoading: boolean;
};

const CorrectionsRecentes = ({ data, etabId, isLoading }: CorrectionsRecentesProps) => {
  return (
    <>
      {isLoading ? (
        <div className=" flex flex-col w-full border h-full rounded-xl items-center justify-center p-10">
          <Rien
            image="/dashboard/bag.svg"
            className="flex flex-col gap-6 justify-center"
            message="Chargement des examens..."
          />
        </div>
      ) : !data ? (
        <div className=" flex flex-col w-full border h-full rounded-xl items-center justify-center p-10">
          <Rien
            image="/dashboard/bag.svg"
            className="flex flex-col gap-6 justify-center"
            message="Pas d'examens pour le moment"
          />
          <AddExameModal>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un examen
              </div>
            </div>
          </AddExameModal>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-
