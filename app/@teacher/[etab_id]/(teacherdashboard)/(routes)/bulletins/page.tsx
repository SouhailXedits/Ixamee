'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

import MarkSheetStudentList from './components/StudentsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClasse } from '@/actions/classe';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getMarkSheets } from '@/actions/mark-sheets/actions';

const Student = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const etab_id = Number(params.etab_id);
  console.log(etab_id);

  const { data: classes } = useQuery({
    queryKey: ['classe'],
    queryFn: async () => await getAllClasse({ user_id: user?.id, etab_id }),
  });
  
  const defaultTerm = user?.term === 'TRIMESTRE' ? 'trimestre_1' : 'semestre_1';

  const [filters, setFilters] = useState({
    term: defaultTerm,
    classe_id: classes?.data[0].id,
  });

  useEffect(() => {
    setFilters({ ...filters, classe_id: classes?.data[0].id });
  },[classes])
  console.log(filters)
 
  

  const {data:markSheets, error} = useQuery({
    queryKey: ["mark-sheets", filters.classe_id, filters.term],
    queryFn: async() => await getMarkSheets(filters)
  })

  console.log(markSheets);

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/classes'} className="cursor-pointer">
              Bulletins
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Bulletins</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* importer */}
          {/* <ImportUneClasse >
            <div className=" justify-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/download-icon.svg" alt="download icon" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Télécharger en pdf
              </div>
            </div>
          </ImportUneClasse> */}
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>

          {/* <AjouterUnEtudiant>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant> */}

          <Select
            defaultValue={defaultTerm}
            onValueChange={(value) => {
              setFilters({ ...filters, term: value });
            }}
          >
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              {/* {user.term === 'TRIMESTRE' && <SelectItem value="tremester1">Trimester 1</SelectItem>}
              {user.term === 'SEMESTRE' && <SelectItem value="semester1">Semestre 1</SelectItem>} */}
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Period</span>
                  </div>
                }
              />
            </SelectTrigger>

            <SelectContent>
              {user?.term === 'TRIMESTRE' && (
                <>
                  <SelectItem value="trimestre_1">Trimester 1</SelectItem>
                  <SelectItem value="trimestre_2">Trimester 2</SelectItem>
                  <SelectItem value="trimestre_3">Trimester 3</SelectItem>
                </>
              )}
              {user?.term === 'SEMESTRE' && (
                <>
                  <SelectItem value="semestre_1">Semestre 1</SelectItem>
                  <SelectItem value="semestre_2">Semestre 2</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

          {classes?.data ? (
            <Select
              defaultValue={classes?.data[0].id}
              onValueChange={(value) => {
                setFilters({ ...filters, classe_id: value });
              }}
            >
              <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
                <SelectValue
                  placeholder={
                    <div className="flex items-center">
                      <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                      <span className="ml-2 text-[#1B8392] text-base  ">Classe</span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {classes?.data?.map((classe: any) => (
                  <SelectItem value={classe.id} key={classe.id}>
                    {classe.name}
                  </SelectItem>
                ))}

                {/* <SelectItem value="bac_info">Bac Info</SelectItem> */}
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className=" h-10 w-[146px]" />
          )}
        </div>
      </nav>

      <div>
        <MarkSheetStudentList />
      </div>
    </main>
  );
};

export default Student;
