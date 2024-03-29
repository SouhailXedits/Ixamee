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
import Loading from '@/app/loading';
import PDFExport from '@/app/_utils/ExportAsPdf';
import { MarkSheetPdfClass } from './components/MarkSheetTeacher';
import { getAllSubjectsByClasseId } from '@/actions/subjects';
import { getNameEstabByClasseId } from '@/actions/establishements';

const Student = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const etab_id = Number(params.etab_id);

  const defaultTerm = user?.term === 'TRIMESTRE' ? 'trimestre_1' : 'semestre_1';
  const [filters, setFilters] = useState<any>({
    term: defaultTerm,
    classe_id: undefined,
    subject_id: undefined,
    searchQuery: '',
  });

  const [searchTimeout, setSearchTimeout] = useState<any>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: any) => {
    const newSearchQuery = e.target.value;
    clearTimeout(searchTimeout);
    setSearchQuery(newSearchQuery);
    setSearchTimeout(
      setTimeout(() => {
        setFilters({ ...filters, searchQuery: newSearchQuery });
      }, 500)
    );
  };

  const { data: classes, isPending: isClassesPending } = useQuery<any>({
    queryKey: ['classe', etab_id],
    queryFn: async () => await getAllClasse({ user_id: user?.id, etab_id }),
  });

  const { data: subjects, isPending: isSubjectsPending } = useQuery<any>({
    queryKey: ['teacherSubject', filters.classe_id],
    queryFn: async () => await getAllSubjectsByClasseId(filters.classe_id),
  });

  const { data: userEstab } = useQuery<any>({
    queryKey: ['user-estab'],
    queryFn: async () => await getNameEstabByClasseId(filters.classe_id),
  });

  const defaultSubject = subjects?.length && subjects[0]?.id;

  // const [filters, setFilters] = useState({
  //   term: defaultTerm,
  //   classe_id: classes?.data?.length && classes?.data[0]?.id,
  //   subject_id: subjects?.[0]?.id,
  // });
  queryClient.setQueryData(['classe-filters'], filters.classe_id);

  useEffect(() => {
    classes?.data?.length && setFilters({ ...filters, classe_id: classes?.data[0]?.id });
  }, [classes?.data]);
  useEffect(() => {
    subjects?.length && setFilters({ ...filters, subject_id: subjects?.[0]?.id });
  }, [subjects]);

  const { data: markSheetsData, isPending } = useQuery({
    queryKey: [
      'mark-sheets',
      filters.classe_id,
      filters.term,
      filters.subject_id,
      filters.searchQuery,
    ],
    queryFn: async () => await getMarkSheets(filters),
  });
  const markSheets = markSheetsData?.data;
  //
  //

  // if (!markSheets && isPending) return <Loading />;

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex items-center justify-between w-full max-md:justify-normal">
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
          <PDFExport pdfName="bulletins">
            <MarkSheetPdfClass
              StudentsData={markSheets}
              classe={classes?.data.find((classe: any) => classe.id === filters.classe_id)?.name}
              term={filters.term}
              estab={userEstab?.name}
            />
          </PDFExport>
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              onChange={handleSearchChange}
              value={searchQuery}
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>

          <Select
            defaultValue={defaultTerm}
            onValueChange={(value) => {
              setFilters({ ...filters, term: value });
            }}
            value={filters.term}
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
          {!isClassesPending ? (
            <Select
              defaultValue={classes?.data?.length && classes?.data[0].id}
              onValueChange={(value) => {
                setFilters({ ...filters, classe_id: value });
              }}
              value={filters.classe_id}
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
          {!isSubjectsPending && !isClassesPending ? (
            <Select
              defaultValue={defaultSubject}
              onValueChange={(value) => {
                setFilters({ ...filters, subject_id: +value });
              }}
              value={filters.subject_id}
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
                {subjects?.map((subject: any) => (
                  <SelectItem value={subject.id} key={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className=" h-10 w-[146px]" />
          )}
        </div>
      </nav>

      <div className="pt-[4rem] max-md:pt-[6rem]">
        {isPending ? (
          <Skeleton className=" h-10 w-full" />
        ) : (
          <MarkSheetStudentList data={markSheets} filters={filters} />
        )}
      </div>
    </main>
  );
};

export default Student;
