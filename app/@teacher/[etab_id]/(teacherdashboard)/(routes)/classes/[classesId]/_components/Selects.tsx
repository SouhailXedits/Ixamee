'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFilters } from '@/store/use-filters-params';
import Image from 'next/image';

function Selects({ classe }: any) {
  const { filters, setFilters} = useFilters((state) => state)
  return (
    <>
      <div>
        {filters.exam_id !== 'undefined' && (
          <Select
            onValueChange={(value) => {
              setFilters({ ...filters, exam_id: value });
            }}
            defaultValue={filters.exam_id + '' || classe?.exam_classe[0]?.id + ''}
          >
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 ">
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Examen</span>
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
      {filters.exam_id !== 'undefined' && (
        <Select
          onValueChange={(value) => {
            setFilters({
              ...filters,
              filterBy: value,
            });
          }}
          defaultValue={filters?.filterBy}
        >
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
