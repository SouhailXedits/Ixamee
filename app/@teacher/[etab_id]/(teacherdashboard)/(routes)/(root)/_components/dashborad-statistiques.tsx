import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatistiquesItems from './statistiques-items';

const DashboradStatistiques = ({
  allStudentCount,
  studentCountPending,
}: {
  allStudentCount: number;
  studentCountPending: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 ">
          <Image
            alt="state img"
            src="dashboard/statistique/statistique.svg"
            width={22}
            height={22}
          />

          <span className=" text-11 text-xl font-[500]  ">Statistiques Examens</span>
        </div>
        <div className="flex gap-3">
          {/* Classe */}
          <Select>
            <SelectTrigger className="w-[180px] text-11 rounded-xl">
              <SelectValue placeholder="Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">3_eme_info</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px] text-11 rounded-xl">
              <SelectValue placeholder="Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">3_eme_info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <StatistiquesItems allStudentCount={allStudentCount} studentCountPending={studentCountPending}/>
      </div>
    </div>
  );
};

export default DashboradStatistiques;
