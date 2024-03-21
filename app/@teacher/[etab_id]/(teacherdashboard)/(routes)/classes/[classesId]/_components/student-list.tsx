'use client';
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import { Skeleton } from '@/components/ui/skeleton';
import { InviterUnEtudiant } from '@/components/modals/inviter-un-etudiant';
import { SupprimerUserInClasse } from '@/components/modals/suprimer-user-in-classe';
import { usePathname, useRouter } from 'next/navigation';
import { getStatusById } from '@/actions/classe';
import { useQueryClient } from '@tanstack/react-query';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import ClasseDropDownMenu from './dropdownmenu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFilters } from '@/store/use-filters-params';

const Status = ({ row }: any) => {
  switch (row.original.status) {
    case 'done':
      return <CorrectionTag correction="Corrigé" color="#12B76A" bgcolor="#E1FDEE" width="100px" />;
    case 'notClassified':
      return (
        <CorrectionTag correction="Non classé" bgcolor="#F4EFFF" color="#8862F5" width="100px" />
      );
    case 'absent':
      return <CorrectionTag correction="Absent" bgcolor="#E7E7E7" color="#727272" width="100px" />;
    case 'pending':
      return (
        <CorrectionTag correction="En cours" bgcolor="#FFF4D3" color="#F69D16" width="100px" />
      );
    default:
      return (
        <CorrectionTag correction="Non corrigé" bgcolor="#FFF4F3" color="#F04438" width="100px" />
      );
  }
};

const Action = ({ row }: any) => {
  const classe_id = row?.original?.classe?.id;
  return <ClasseDropDownMenu row={row} classe_id={classe_id} />;
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
export const columns = [
  {
    id: 'select',
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'range',
    header: () => {
      return <span className="text-[#1B8392] ">Rang</span>;
    },
    cell: ({ row }: any) => (
      <div className="w-10 h-[21px] p-2.5 bg-[#D8ECF3] rounded-[10px] border border-[#1B8392] flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-[#1B8392] text-sm font-semibold ">
          {+row.id+1}
          {/* {row.getValue('range')}  */}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'name',

    header: ({ column }: any) => {
      return (
        <Button
          className="text-[#1B8392]  hover:text-[#1B8392]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom et prénom
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2">
        <Image
          src={row?.original?.image ? row?.original?.image : '/defaultUserAvatr.svg'}
          alt=""
          width={100}
          height={100}
          className="object-cover rounded-full w-[42px] h-[42px]"
        />

        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="">
              {row.getValue('name').length > 10
                ? row.getValue('name').slice(0, 10) + '...'
                : row.getValue('name')}
            </span>
            {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
          </HoverCardTrigger>
          <HoverCardContent className="text-[#727272]  break-words max:w-[200px] text-md">
            <span className="">{row.getValue('name')}</span>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
  },

  {
    accessorKey: 'email',
    header: ({ column }: any) => {
      return (
        <Button className="text-[#1B8392]  hover:text-[#1B8392]" variant="ghost">
          Email
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="">
            {row.getValue('email').length > 26
              ? row.getValue('email').slice(0, 26) + '...'
              : row.getValue('email')}
          </span>
          {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
        </HoverCardTrigger>
        <HoverCardContent className="text-[#727272]  break-words max:w-[200px] text-md">
          <span className="">{row.getValue('email')}</span>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: 'correction',
    header: () => {
      return <span className="text-[#1B8392] ">Correction</span>;
    },
    cell: ({ row }: any) => Status({ row }),
  },

  {
    header: () => {
      return <span className="text-[#1B8392] w-[235px] ">Actions</span>;
    },
    id: 'actions',
    enableHiding: false,

    cell: ({ row }: any) => Action({ row }),
  },
];

export function StudentList({ data, class_id, isPending, isPendingUserOfClasses }: any) {
  if (!data) {
    return null;
  }

  console.log(data, 'data');

  const queryClient = useQueryClient();
  const etab_id = queryClient.getQueryData(['etab_id']) as number;

  // const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { filters, setFilters } = useFilters((state) => state);
  console.log(filters)

  const table = useReactTable<any>({
    data,
    columns,
    // onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      // sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    table.setPageIndex(filters.page_number);
  }, [filters.page_number]);

  useEffect(() => {
    if (data?.length > 0 && data?.length < filters.page_number) {
      table.setPageIndex(Math.ceil(data?.length / 10) - 1);
      setFilters({ ...filters, page_number: Math.ceil(data?.length / 10) - 1 });
    }
  }, [data]);

  return (
    <div className="w-full">
      {isPending ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-[30px] " />
          <Skeleton className="w-full h-[80px] " />
          <Skeleton className="w-full h-[80px] " />
        </div>
      ) : (
        <>
          <div className="border rounded-md ">
            {/* <Link href={`/2/classes/${class_id}?page=3`}>page 2 </Link> */}
            <Table>
              <TableHeader className="bg-[#F0F6F8] text-[#1B8392]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
                      Pas d’étudiants ajoutés à cette classe.
                      <AjouterUnEtudiant class_id={class_id} etab_id={etab_id}>
                        <span className="text-[#1B8392] cursor-pointer">
                          {' '}
                          &thinsp;{`Ajoutez `}&thinsp;
                        </span>
                      </AjouterUnEtudiant>
                      vos étudiants ou{' '}
                      <ImportUneClasse class_id={class_id} etab_id={etab_id}>
                        <span className="text-[#1B8392] cursor-pointer">
                          &thinsp; importez &thinsp;
                        </span>
                      </ImportUneClasse>
                      une liste.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end py-4 space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{' '}
              {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s) .
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters({ ...filters, page_number: filters.page_number - 1 });
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.nextPage();
                  setFilters({ ...filters, page_number: filters.page_number + 1 });
                }}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
