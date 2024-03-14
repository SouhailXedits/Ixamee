'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { ModifierUnEtudiant } from '@/components/modals/modifier-un-etudiant';
import { CorrectExam } from '@/components/modals/correct-exam';
import { cn } from '@/lib/utils';
import { link } from 'fs';
import { usePathname, useRouter } from 'next/navigation';



export type Payment = {
  id: string;
  rang: number;
  name: string;
  email: string;
  examsArray: any;
  average: number;
};

export const CorrectionTag = ({
  correction,
  color,
  width,
  bgcolor,
}: {
  correction: 'En cours' | 'Non corrigé' | 'Corrigé' | 'Absent' | 'Non classé';
  color: string;
  width: string;
  bgcolor: string;
}) => (
  <div
    className={`w-[${width}] h-[22px] px-[5px]  rounded-2xl justify-center items-center gap-[5px] inline-flex`}
    style={{ backgroundColor: `${bgcolor}` }}
  >
    <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: `${color}` }} />
    <div className={` text-xs font-normal leading-[18px]`} style={{ color: `${color}` }}>
      {correction}
    </div>
  </div>
);

export default function MarkSheetStudentList({ data: realData, filters }: any) {
  console.log(realData);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const path = usePathname();

  const maxLength = Math.max(...realData?.map((student: any) => student.exams.length));
  const examsArray =
    realData.find((student: any) => student.exams.length === maxLength)?.exams || [];
  console.log(realData)
  

  // const sortedData = [...realData].sort((a, b) => b.average - a.average);
  // console.log(sortedData);
  // const rankedData = sortedData.map((student, index) => ({ ...student, rank: index + 1 }));


  const columns: ColumnDef<any>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="bg-white"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'name',
      header: () => {
        return <span className="text-[#1B8392] ">Nom et prénom</span>;
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2 capitalize">
          <Image
            src={row.original.image || "/defaultUserAvatr.svg"}
            alt=""
            width={42}
            height={42}
            className="rounded-full"
          />
          {row.original.name}
        </div>
      ),
    },
    ...examsArray.map((exam: any) => ({
      accessorKey: `exams.${exam.name.toLowerCase()}.average`, // Updated accessorKey
      header: () => {
        return (
          <p className="flex flex-col ">
            {' '}
            <span className="text-[#1B8392]">{exam.name}</span>
            <span className="text-[#1B8392]/80 text-xs">coefficient : {exam.coefficient}</span>
          </p>
        );
      },
      cell: ({ row }: any) => {
        const examInfos = row.original.exams.find(
          (e: any) => e.name.toLowerCase() === exam.name.toLowerCase()
        );
        
        return (
          <div className="text-[#727272]">
            {examInfos?.status !== 'done'
              ? examInfos?.status
              : `${examInfos?.average || '--'}${' '} / ${examInfos.totalMarks}`}
          </div>
        );
      }
        ,
    })),
    {
      accessorKey: 'average',
      header: ({ column }) => {
        return (
          <Button
            className="w-full h-full text-white rounded-none hover:text-white hover:bg-mainGreen/85 bg-mainGreen"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Moyenne
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const average = row.original.average as number;
        console.log(row)



        return (
          <div className={cn('flex justify-center items-center')}>
              <p
                className={cn(
                  'text-[#727272] rounded-full px-2',
                  average > 15 && 'text-[#12B76A] bg-[#12B76A]/30',
                  average <= 15 && average >= 10 && 'text-[#FBB800]  bg-[#FBB800]/30 ',
                  average < 10 && 'text-[#F04438]  bg-[#F04438]/30'
                )}
              >
                {average.toFixed(2)} / 20
              </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'rank',
      header: () => {
        return <span className="text-[#1B8392]">Rang</span>;
      },
      cell: ({ row }) => (
        <div className="w-10 h-[21px] p-2.5 rounded-[10px]  flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-[#1B8392] text-sm font-semibold ">
            {row.original.rank}
          </div>
        </div>
      ),
    },
    // ...
  ];

  const table = useReactTable({
    data: realData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function handleStudentClick(id: string) {
    const currPath = path;
    router.push(
      `${currPath}/classe/${filters.classe_id}/subject/${filters.subject_id}/student/${id}`
    );
  }





  if (realData.length === 0) return <p>Pas de bulletins à afficher.</p>;
  return (
    <div className="w-full">
      <div className="rounded-md ">
        <Table>
          <TableHeader className="bg-[#F0F6F8] text-[#1B8392] rounded ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-0 text-center border ">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleStudentClick(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-lg text-center bg-transparent"
                >
                  Pas d&apos;étudiants maintemnant
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur{' '}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
