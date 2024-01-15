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

const data: Payment[] = [
  {
    id: 'm5gr84i9',

    name: 'Géographie',
  },
  {
    id: '3u1reuv4',
    name: 'Anglais',
  },
  {
    id: 'derv1ws0',
    name: 'Mécanique',
  },
];

export type Payment = {
  id: string;
  name: string;
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
export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'rang',
  //   header: () => {
  //     return <span className="text-[#1B8392] ">Rang</span>;
  //   },
  //   cell: ({ row }) => (
  //     <div className="w-10 h-[21px] p-2.5 bg-[#D8ECF3] rounded-[10px] border border-[#1B8392] flex-col justify-center items-center gap-2.5 inline-flex">
  //       <div className="text-center text-[#1B8392] text-sm font-semibold ">
  //         {row.getValue('rang')}
  //       </div>
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="text-[#1B8392]  hover:text-[#1B8392]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom de l&apos;etablissement
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <Image src="/geographie.svg" alt="" width={42} height={42} className="rounded-full" />
        {row.getValue('name')}
      </div>
    ),
  },

  {
    header: () => {
      return <span className="text-[#1B8392] w-[205px] ">Actions</span>;
    },
    id: 'actions',
    enableHiding: false,

    cell: () => {
      return (
        <div className="flex items-center gap-4 " style={{ width: '50px' }}>
          {/* <ModifierUnEtudiant>
            <Image src="/eyesicon.svg" alt="" width={20} height={20} className="cursor-pointer " />
          </ModifierUnEtudiant> */}

          {/* <CorrectExam>
            <Image
              src="/correctionExam.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer "
            />
          </CorrectExam> */}
          {/* <Image
            src="/invitestudent.svg"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer "
          /> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem> */}
              <ModifierUnEtudiant>
                {/* <Image
                  src="/eyesicon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer "
                /> */}
                <p className="rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent ">
                  Modifier
                </p>
                {/* <DropdownMenuItem>Modifier</DropdownMenuItem> */}
              </ModifierUnEtudiant>

              <DropdownMenuItem>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function SubjectsList({ data, isPending, onPageChange, currentpage, totalCount }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isPending)
    return Array.from({ length: 5 }, (_, index) => (
      <Skeleton key={index} className="w-70 h-10 mt-5" />
    ));

  const totalPageCount = Math.floor(totalCount / 10) + 1;
  console.log(totalCount)

  function handleNextPage() {
    console.log(currentpage + 1);
    onPageChange(currentpage + 1);
    table.nextPage();
  }
  function handlePreviousPage() {
    // const cur = table.getPageCount();
    if (currentpage === 0) console.log(currentpage - 1);
    onPageChange(currentpage - 1);
    table.previousPage();
  }

  return (
    <div className="w-full">
      <div className="border rounded-md ">
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
                  Pas d&apos;establishementsList ajoutés.
                  <span className="text-[#1B8392]">Ajoutez</span> enseignants ou{' '}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage()}
            disabled={currentpage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={currentpage + 1 > totalPageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
