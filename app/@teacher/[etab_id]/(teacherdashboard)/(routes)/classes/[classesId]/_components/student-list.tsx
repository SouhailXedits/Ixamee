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
import { InviterUnEtudiant } from '@/components/modals/inviter-un-etudiant';
import { SupprimerUserInClasse } from '@/components/modals/suprimer-user-in-classe';
import { usePathname, useRouter } from 'next/navigation';
import { getStatusById } from '@/actions/classe';
function calculateDateDifference(date1: Date, date2: Date): number {
  const differenceInMilliseconds = Math.abs(date1?.getTime() - date2?.getTime());
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return differenceInDays;
}
function handleUpdateUser(user_id: number) {
  // console.log(user_id);
}
const Status = ({ row }: any) => {
  // console.log(row.original);
  // switch (row.original?.status[0]) {
  //   case 'done':
  //     return <CorrectionTag correction="Corrigé" color="#12B76A" bgcolor="#E1FDEE" width="100px" />;
  //   case 'notClassified':
  //     return (
  //       <CorrectionTag correction="Non classé" bgcolor="#F4EFFF" color="#8862F5" width="100px" />
  //     );
  //   case 'absent':
  //     return <CorrectionTag correction="Absent" bgcolor="#E7E7E7" color="#727272" width="100px" />;
  //   case 'pending':
  //     return (
  //       <CorrectionTag correction="En cours" bgcolor="#FFF4D3" color="#F69D16" width="100px" />
  //     );
  //   default:
  //     return (
  //       <CorrectionTag correction="Non corrigé" bgcolor="#FFF4F3" color="#F04438" width="100px" />
  //     );
  // }
  // getStatusById(row?.original?.id)
  //   .then((correction) => {
  //     switch (correction[0]?.status) {
  //       case 'done':
  //         return (
  //           <CorrectionTag correction="Corrigé" color="#12B76A" bgcolor="#E1FDEE" width="100px" />
  //         );
  //       case 'notClassified':
  //         return (
  //           <CorrectionTag
  //             correction="Non classé"
  //             bgcolor="#F4EFFF"
  //             color="#8862F5"
  //             width="100px"
  //           />
  //         );
  //       case 'absent':
  //         return (
  //           <CorrectionTag correction="Absent" bgcolor="#E7E7E7" color="#727272" width="100px" />
  //         );
  //       case 'pending':
  //         return (
  //           <CorrectionTag correction="En cours" bgcolor="#FFF4D3" color="#F69D16" width="100px" />
  //         );
  //       default:
  //         return (
  //           <CorrectionTag
  //             correction="Non corrigé"
  //             bgcolor="#FFF4F3"
  //             color="#F04438"
  //             width="100px"
  //           />
  //         );
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // Handle the error if needed
  //     // return null;
  //   });
};

const Action = ({ row }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 " style={{ width: '50px' }}>
      <ModifierUnEtudiant data={row.original}>
        <Image src="/eyesicon.svg" alt="" width={20} height={20} className="cursor-pointer " />
      </ModifierUnEtudiant>
      {row?.original?.exam !== 0 && (
        <CorrectExam data={row?.original}>
          <Image src="/correctionExam.svg" alt="" width={20} height={20} aria-disabled={true} />
        </CorrectExam>
      )}

      {!row.original.emailVerified ? (
        calculateDateDifference(row.original.invited_at, row.original.invited_at) == 0 ? (
          <Image
            src="/userInvited.svg"
            alt=""
            width={20}
            height={20}
            aria-disabled={true}
            className="cursor-not-allowed "
          />
        ) : (
          <InviterUnEtudiant studentEmail={row.original.email}>
            <Image
              src="/invitestudent.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer "
            />
          </InviterUnEtudiant>
        )
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button name="bnt" variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <SupprimerUserInClasse user_id={row?.original?.id}>
            <DropdownMenuLabel className="cursor-pointer">Supprimer</DropdownMenuLabel>
          </SupprimerUserInClasse>
          <DropdownMenuLabel
            onClick={() => router.push(`${pathname}/${row.original.id}`)}
            className="cursor-pointer"
          >
            Modifier
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
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
          {/* {console.log(row.id)} */}
          {+row.id + 1}
          {/* {row.getValue('range')} */}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'name',

    header: () => {
      return <span className="text-[#1B8392] ">Nom et prénom</span>;
    },
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2 capitalize">
        {console.log(row?.original?.image)}
        <Image
          src={row?.original?.image ? row?.original?.image : '/defaultUserAvatr.svg'}
          alt=""
          width={42}
          height={42}
          className="rounded-full"
        />
        {row.getValue('name')}
      </div>
    ),
  },

  {
    accessorKey: 'email',
    header: ({ column }: any) => {
      return (
        <Button
          className="text-[#1B8392]  hover:text-[#1B8392]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }: any) => <div className="lowercase text-[#727272]">{row.getValue('email')}</div>,
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
      return <span className="text-[#1B8392] w-[205px] ">Actions</span>;
    },
    id: 'actions',
    enableHiding: false,

    cell: ({ row }: any) => Action({ row }),
  },
];

export function StudentList({ data, isPending }: any) {
  // let newData = [data, exam];
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
                      <span className="text-[#1B8392]">Ajoutez</span> vos étudiants ou{' '}
                      <span className="text-[#1B8392]">importez</span> une liste.
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
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
