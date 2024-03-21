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
import { useQueryClient } from '@tanstack/react-query';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import dayjs from 'dayjs';

interface CorrectionTagProps {
  correction: 'En cours' | 'Non corrigé' | 'Corrigé' | 'Absent' | 'Non classé';
  color: string;
  width: string;
  bgcolor: string;
}

const CorrectionTag = ({
  correction,
  color,
  width,
  bgcolor,
}: CorrectionTagProps) => (
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

const calculateDateDifference = (date1: Date, date2: Date): number => {
  const differenceInMilliseconds = Math.abs(date1?.getTime() - date2?.getTime());
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return differenceInDays;
};

const handleUpdateUser = (user_id: number) => {};

const Status = ({ row }: any) => {
  const status = row.original.status;

  let correctionTagColor;
  let correctionTagBgColor;
  let correctionTagText;

  switch (status) {
    case 'done':
      correctionTagColor = '#12B76A';
      correctionTagBgColor = '#E1FDEE';
      correctionTagText = 'Corrigé';
      break;
    case 'notClassified':
      correctionTagColor = '#8862F5';
      correctionTagBgColor = '#F4EFFF';
      correctionTagText = 'Non classé';
      break;
    case 'absent':
      correctionTagColor = '#727272';
      correctionTagBgColor = '#E7E7E7';
      correctionTagText = 'Absent';
      break;
    case 'pending':
      correctionTagColor = '#F69D16';
      correctionTagBgColor = '#FFF4D3';
      correctionTagText = 'En cours';
      break;
    default:
      correctionTagColor = '#F04438';
      correctionTagBgColor = '#FFF4F3';
      correctionTagText = 'Non corrigé';
  }

  return (
    <CorrectionTag
      correction={correctionTagText}
      color={correctionTagColor}
      width="100px"
      bgcolor={correctionTagBgColor}
    />
  );
};

const Action = ({ row }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const correctionExamOfUser = row?.original?.correctionExamOfUser;

  const handleInviteStudent = () => {
    const studentEmail = row.original.email;
    const isInvitedRecently =
      calculateDateDifference(row.original.invited_at, new Date()) === 0;

    if (isInvitedRecently) {
      return;
    }

    // Invite the student here
  };

  return (
    <div className="flex items-center gap-4 " style={{ width: '50px' }}>
      <ModifierUnEtudiant data={row.original}>
        <Image
          src="/eyesicon.svg"
          alt=""
          width={20}
          height={20}
          className="cursor-pointer "
        />
      </ModifierUnEtudiant>
      {row?.original?.exam !== undefined && (
        <CorrectExam data={correctionExamOfUser}
