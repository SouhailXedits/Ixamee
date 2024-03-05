import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

function Selects({ exam, setExam, setFilter, classe }: any) {
  return (
    <>
      <div>
        {exam !== 'undefined' && (
          <Select
            onValueChange={(value) => setExam(value)}
            defaultValue={classe?.exam_classe[0]?.id + ''}
          >
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 ">
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <span className="ml-2 text-[#1B8392] text-base  ">Sélectionner un examen</span>
                  </div>
                }
              />
            </SelectTrigger>

            <SelectContent>
              {classe?.exam_classe?.map((exam: any) => (
                <SelectItem key={exam.id} value={exam.id + ''} className="">
                  {exam.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {exam !== 'undefined' && (
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
            <SelectValue
              placeholder={
                <div className="flex items-center">
                  <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                  <span className="ml-2 text-[#1B8392] text-base  ">Filter</span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allExam" className="">
              All
            </SelectItem>
            <SelectItem value="corrige" className="">
              Corrigé
            </SelectItem>
            <SelectItem value="en-cours">En cours</SelectItem>
            <SelectItem value="non-corrigé">Non corrigé</SelectItem>
            <SelectItem value="non-classé">Non classé</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
}

export default Selects;
