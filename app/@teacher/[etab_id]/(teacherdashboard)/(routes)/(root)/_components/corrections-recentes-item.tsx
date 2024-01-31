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
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddExameModal } from '@/components/modals/addExamesModal';

const CorrectionsRecentes = ({ data, etabId }: any) => {
  return (
    <>
      {!data ? (
        <div className=" flex flex-col w-full border h-full rounded-xl items-center justify-center p-10">
          <Rien
            image="/dashboard/bag.svg"
            className="flex flex-col gap-6 justify-center"
            message="Pas d'examens pour le moment"
          />
          {/* <Link href={`/${etabId}/examens`} className="w-2/5">
            <Button
              className={` bg-2 font-semibold h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
            >
              Ajouter un examen
            </Button>
          </Link> */}
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
          <div className="flex items-center justify-end gap-3">
            {/* Devoir */}
            <Select>
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="les plus récents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">les plus récents</SelectItem>
                <SelectItem value="light">les plus elevée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full border h-[300px] rounded-xl overflow-auto">
            <BulletinsStudentList />
          </div>
        </div>
      )}
    </>
  );
};

export default CorrectionsRecentes;
