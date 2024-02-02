import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BulletinsStudentList from './bulletins-student-list';
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';

const BulletinsDesEtudiants = ({ data, etabId }: any) => {
  data=["hd"]
  return (
    <>
      {!data ? (
        <div className=" flex flex-col w-full border h-full rounded-xl items-center justify-center p-10">
          <Rien
            image="/dashboard/books.svg"
            className="flex flex-col gap-6 justify-center"
            message="Pas de bulletins pour le moment"
          />
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
                <SelectItem value="recent">les plus récents</SelectItem>
                <SelectItem value="elevé">les plus elevée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full border rounded-xl overflow-auto">
            <BulletinsStudentList />
          </div>
        </div>
      )}
    </>
  );
};

export default BulletinsDesEtudiants;
