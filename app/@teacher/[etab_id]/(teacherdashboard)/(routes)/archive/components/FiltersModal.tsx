'use client';
import { SelectScrollable } from '@/components/modals/SelectScrollable';
import { DatePickerWithRange } from '@/components/ui/RangeDatePicker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogClose } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

function FiltersModal() {

    const queryClient = useQueryClient();
  // const handleDateRangeChange = (newDateRange: DateRange) => {

  //   const [filters, setFilters] = useState({
  //     // Your other filter properties
  //     dateRange: undefined,
  //   });

  //   // Update the date range in the filters
  //   setFilters({
  //     ...filters,
  //     dateRange: newDateRange,
  //   });

  //   // Call the onChange prop to pass the updated filters to the parent
  //   onChange({
  //     ...filters,
  //     dateRange: newDateRange,
  //   });
  //   console.log(filters)
  // };
  const pathname = usePathname();
  const currRoute = pathname.split('/')[3];

  const [filters, setFilters] = useState<any>({
    // Your other filter properties
    dateRange: undefined,
  });
  console.log(filters);

  // useEffect(() => {
  // }, [filters]);
  function handleSubmitFilters() {
    queryClient.setQueryData(['a-classes-filters'], filters);
    queryClient.invalidateQueries({ queryKey: ['archived_classes']});
  }
  return (
    <Dialog>
      <DialogTrigger className=" bg-transparent border-mainGreen/60 flex gap-3 items-center border text-mainGreen rounded p-2">
        <Image src="/filterIcon.svg" alt=" filter icon" height={20} width={20} />
        Filtre
        <Image src="/arrowdown.svg" alt=" arrow down icon" height={20} width={20} />
      </DialogTrigger>
      <DialogContent className=" h-[450px] w-[350px]">
        <DialogHeader>
          <DialogTitle>Filtre</DialogTitle>
          <DialogDescription>Archivé le : </DialogDescription>
          <DatePickerWithRange onChange={setFilters} />

          {currRoute === 'exams' && (
            <>
              <div>
                {' '}
                <DialogDescription>Creé le : </DialogDescription>
                <DatePickerWithRange onChange={setFilters} />
              </div>

              <div>
                <DialogDescription>Classe : </DialogDescription>
                <Select>
                  <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer  gap-3 hover:opacity-80  ">
                    <SelectValue
                      placeholder={
                        <div className="flex items-center">
                          {/* <Image src={'/filterIcon.svg'} className=' grayscale-50' alt="filtericon" width={20} height={20} /> */}
                          <span className="ml-2  text-base text-black/60  ">Classe</span>
                        </div>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bac_math_2">Bac math 2</SelectItem>
                    <SelectItem value="bac_info">Bac Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <DialogDescription>Correction : </DialogDescription>
                <Select>
                  <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer  gap-3 hover:opacity-80  ">
                    <SelectValue
                      placeholder={
                        <div className="flex items-center">
                          {/* <Image src={'/filterIcon.svg'} className=' grayscale-50' alt="filtericon" width={20} height={20} /> */}
                          <span className="ml-2  text-base text-black/60  ">correction</span>
                        </div>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrigé_sm">&gt; 0% ~ 15% corrigé</SelectItem>
                    <SelectItem value="corrigé_md">&gt; 15% ~ 50% corrigé</SelectItem>
                    <SelectItem value="corrigé_lg">&gt; 50% ~ 75% corrigé</SelectItem>
                    <SelectItem value="corrigé_xl">&gt; 75% ~ 100% corrigé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </DialogHeader>
        <DialogClose>
          <Button className=" bg-mainGreen" onClick={handleSubmitFilters} name='btn'>
            Appliquer les filtres
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default FiltersModal;
