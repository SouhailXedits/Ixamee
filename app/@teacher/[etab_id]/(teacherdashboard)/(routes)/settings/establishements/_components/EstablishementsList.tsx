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
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { EditEstab } from './EditEstabModal';
import { DeleteEstab } from './DeleteEstabModal';

export type Payment = {
  id: string;
  name: string;
};

interface estabProps {
  id: number;
  name: string;
}
interface estabListProps {
  data: estabProps[];
  isPending: boolean;
  onPageChange: (n: number) => void;
  currentpage: number;
  totalCount: number;
}

const ActionModal = ({ row }: any) => {
  const [deleteForm, setDeleteForm] = useState(false);
  const [editFrom, setEditForm] = useState(false);
  return (
    <div className="flex items-center gap-4 " style={{ width: '50px' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button name="bnt" variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditForm(true)}>Modifier</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteForm(true)}>Supprimer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteEstab id={parseInt(row.original.id)} open={deleteForm} setOpen={setDeleteForm} />
      <EditEstab
        id={parseInt(row.original.id)}
        currentName={row.original.name}
        open={editFrom}
        setOpen={setEditForm}
      />
    </div>
  );
};

export const columns: ColumnDef<estabProps>[] = [
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

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="text-[#1B8392]  hover:text-[#1B8392]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom de l&apos;établissement
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {/* <Image src="/defaultUserAvatr.svg" alt="" width={42} height={42} className="rounded-full" /> */}
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

    cell: ActionModal,
  },
];

export function EstablishementsList({
  data,
  isPending,
  onPageChange,
  currentpage,
  totalCount,
}: estabListProps) {
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
    autoResetPageIndex: false,
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

  function handleNextPage() {
    onPageChange(currentpage + 1);
    table.nextPage();
  }
  function handlePreviousPage() {
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
                  <span className="text-[#1B8392]">Ajoutez</span> establishementsList
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
            onClick={() => handlePreviousPage()}
            disabled={currentpage === 1}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={currentpage + 1 > totalPageCount}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
