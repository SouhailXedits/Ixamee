import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import ExamCorrectionList from './exam-correction-list';
import Rien from './Rien';
import BulletinsStudentList from './bulletins-student-list';

type CorrectionsRecentesProps = {
  data?: any;
  isLoading: boolean;
};

function CorrectionsRecentes({ data, isLoading }: CorrectionsRecentesProps) {
  if (isLoading) {
    return (
      <div className="w-full border h-full rounded-xl flex items-center justify-center p-10">
        <Rien
          image="/dashboard/bag.svg"
          className="flex flex-col gap-6 justify-center"
          message="Chargement des examens..."
        />
      </div>
    );
  }

  return (
    <>
      {!data ? (
        <div className="w-full border h-full rounded-xl flex items-center justify-center p-10">
          <Rien
            image="/dashboard/bag.svg"
            className="flex flex-col gap-6 justify-center"
            message="Pas d'examens pour le moment"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-3">
            {/* Devoir */}
            {/* <Select>
              <SelectTrigger className=" w-1/4 rounded-xl  text-11">
                <SelectValue className="text-sm" placeholder="les plus récents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">les plus récents</SelectItem>
                <SelectItem value="light">les plus elevée</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <div className="w-full border h-[300px] rounded-xl overflow-auto">
            <ExamCorrectionList data={data} />
          </div>
        </div>
      )}
    </>
  );
}

export default CorrectionsRecentes;
