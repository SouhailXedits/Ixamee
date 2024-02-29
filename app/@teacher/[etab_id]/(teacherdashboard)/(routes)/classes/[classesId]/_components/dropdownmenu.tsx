import { CorrectExam } from '@/components/modals/correct-exam';
import { InviterUnEtudiant } from '@/components/modals/inviter-un-etudiant';
import { ModifierUnEtudiant } from '@/components/modals/modifier-un-etudiant';
import { SupprimerUserInClasse } from '@/components/modals/suprimer-user-in-classe';
import TelachargePdfEvaluation from '@/components/shared-components/TelachargePdfEvaluation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import TelachargePdfEvaluationClasse from './TelachargePdfEvaluationClasse';

export default function ClasseDropDownMenu({ row, classe_id }: any) {
  function calculateDateDifference(date1: Date, date2: Date): number {
    const differenceInMilliseconds = Math.abs(date1?.getTime() - date2?.getTime());
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays;
  }
  const correctionExamOfUser = row?.original?.correctionExamOfUser;
  console.log(correctionExamOfUser);
  const [modfier, setModfier] = React.useState(false);

  const [deleteForm, setDeleteForm] = React.useState(false);
  return (
    <div className="flex items-center gap-4 " style={{ width: '50px' }}>
      {correctionExamOfUser ? (
        <CorrectExam
          userContent={correctionExamOfUser}
          user_id={row.original.id}
          userDetails={row?.original}
        >
          <Image
            src="/correctionExam.svg"
            alt=""
            width={20}
            height={20}
            aria-disabled={true}
            className="cursor-pointer"
          />
        </CorrectExam>
      ) : (
        <Skeleton className="w-[40px] h-[30px] " />
      )}

      <ModifierUnEtudiant data={row.original} open={modfier} setOpen={setModfier} />

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
      <SupprimerUserInClasse
        user_id={row?.original?.id}
        classe_id={classe_id}
        open={deleteForm}
        setOpen={setDeleteForm}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDeleteForm(true)}>
            Supprimer
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setModfier(true)}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem>
            {correctionExamOfUser && correctionExamOfUser?.correction_exam_content !== null ? (
              <TelachargePdfEvaluationClasse
                userContent={correctionExamOfUser}
                user_id={row.original.id}
                userDetails={row?.original}
              ></TelachargePdfEvaluationClasse>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
