import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { EditeExame } from './EditeExame';
import  EditeExame  from './EditeExame';
import { DeleteExame } from './DeleteExame';
import { ArchiveExame } from './ArchiveExame';
interface DropdownMenuItemSelectProps {
  children: React.ReactNode;
  exam : any
}

export const DropdownMenuItemSelect = ({ children  , exam}: DropdownMenuItemSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-45  text-[#727272]">
        <DropdownMenuGroup>
          {/* <EditeExame exam={exam}>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg">Modifier</span>
            </DropdownMenuLabel>
          </EditeExame> */}
          <EditeExame />
            

          <DeleteExame exam_id={exam?.id}>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg ">Supprimer</span>
            </DropdownMenuLabel>
          </DeleteExame>
          <ArchiveExame id={exam?.id}>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg">Archiver</span>
            </DropdownMenuLabel>
          </ArchiveExame>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};