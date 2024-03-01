import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { EditeExame } from './EditeExame';
import { DeleteExame } from './DeleteExame';
import { ArchiveExame } from './ArchiveExame';
import { EditeExame } from './EditeExame';
import { Addascal } from './Addascale';
import React from 'react';

interface DropdownMenuItemSelectProps {
  children: React.ReactNode;
  exam: any;
}

export const DropdownMenuItemSelect = ({ children, exam }: DropdownMenuItemSelectProps) => {
  console.log(exam);
  const [modfier, setModfier] = React.useState(false)
  const [deleteForm, setDeleteForm] = React.useState(false)
  const [archiveForm, setArchiveForm] = React.useState(false)
  const [addAscale, setAddAscale] = React.useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-45  text-[#727272]" > 
          <DropdownMenuGroup>

              <DropdownMenuItem className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor" onClick={() => setModfier(true) }>
                <span className="">Modifier</span>
              </DropdownMenuItem>

            {/* <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
            <span>Modifier</span>
          </DropdownMenuLabel> */}


              <DropdownMenuItem className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor" onClick={() => setDeleteForm(true)}>
                <span>Supprimer</span>
              </DropdownMenuItem>


              <DropdownMenuItem className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor" onClick={() => setArchiveForm(true)}>
                <span>Archiver</span>
              </DropdownMenuItem>

            {/* {exam.is_published && ( */}

              <DropdownMenuItem className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor" onClick={() => setAddAscale(true)}>
                <span>Ajouter un barème</span>
              </DropdownMenuItem>

            {/* )} */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditeExame exam={exam} open={modfier} setOpen={setModfier} />
      <DeleteExame exam_id={exam?.id} open={deleteForm} setOpen={setDeleteForm} />
      <ArchiveExame id={exam?.id} open={archiveForm} setOpen={setArchiveForm} />
      <Addascal exam={exam} open={addAscale} setOpen={setAddAscale} />
        

    </>
  );
};
