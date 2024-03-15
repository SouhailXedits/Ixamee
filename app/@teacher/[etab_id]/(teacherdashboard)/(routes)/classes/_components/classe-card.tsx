'use client';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModifierUneClasse } from '@/components/modals/modifier-une-classe';
import { SupprimerUneClasse } from '@/components/modals/suprimer-classe';
import { ArchiveUneClasse } from '@/components/modals/archiver-classe';
import React from 'react';
import { useFilters } from '@/store/use-filters-params';
interface itemProps {
  id: any;
  name: string;
  NumberOfStudent: number;
  student_class: any;
}

const ClasseCard = ({ data }: { data: itemProps }) => {
  const route = useRouter();
  const {resetFilters} = useFilters()
  const [deleteForm, setDeleteForm] = React.useState(false);
  const [modefierProps, setModefierProps] = React.useState(false);
  const [archiveProps, setArchiveProps] = React.useState(false);

  return (
    <div className="min-w-[195px] h-[190px] bg-[#F3F6F6] pt-3.5 rounded-xl flex flex-col justify-start items-center gap-[15px] hover:shadow-md transition-all ">
      <div className="flex justify-between w-full px-5">
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="text-xl font-semibold  text-[#727272]">
              {data.name.length > 10 ? data.name.slice(0, 10) + '...' : data.name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-[200px] text-wrap">
            <span className="text-[#727272]  break-words max:w-[200px] text-md">{data.name}</span>
          </HoverCardContent>
        </HoverCard>

        {/* <DropdownMenuItemSelect data={data}>
          {/* <Image
            src="/icons/kebab-menu.svg"
            alt="kebabMenu "
            width={19}
            height={19}
            className="cursor-pointer hover:opacity-80"
          /> */}
        {/* </DropdownMenuItemSelect> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src="/icons/kebab-menu.svg"
              alt="kebabMenu "
              width={19}
              height={19}
              className="cursor-pointer hover:opacity-80"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-45  text-[#727272]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor"
                onClick={() => setModefierProps(true)}
              >
                <span>Modifier</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor"
                onClick={() => setDeleteForm(true)}
              >
                <span>Supprimer</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor"
                onClick={() => setArchiveProps(true)}
              >
                <span>Archiver</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModifierUneClasse data={data} open={modefierProps} setOpen={setModefierProps} />

        <SupprimerUneClasse classe_id={data.id} open={deleteForm} setOpen={setDeleteForm} />
        <ArchiveUneClasse classe_id={data.id} open={archiveProps} setOpen={setArchiveProps} />
      </div>
      <div className="w-full px-5  text-lg text-[#727272] pb-7 ">
        {data?.student_class?.length} Etudiants
      </div>

      <Link
        href={`classes/${data.id}`}
        key={data.id}
        className=" pl-3 pr-3 text-md font-[700] leading-tight text-center text-white"
        onClick={() => resetFilters()}
      >
        <div className=" bg-[#1B8392]  p-2 rounded-lg cursor-pointer hover:opacity-80 pl-4 pr-4">
          Ouvrir
        </div>
      </Link>
    </div>
  );
};

export default ClasseCard;
