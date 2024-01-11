import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditeExame } from './EditeExame';
import { DeleteExame } from './DeleteExame';
import { ArchiveExame } from './ArchiveExame';
interface DropdownMenuItemSelectProps {
  children: React.ReactNode;
}

export const DropdownMenuItemSelect = ({ children }: DropdownMenuItemSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-45  text-[#727272]">
        <DropdownMenuGroup>
          <EditeExame>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg">Modifier</span>
            </DropdownMenuLabel>
          </EditeExame>

          <DeleteExame>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg ">Supprimer</span>
            </DropdownMenuLabel>
          </DeleteExame>
          <ArchiveExame>
            <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
              <span className="text-lg">Archiver</span>
            </DropdownMenuLabel>
          </ArchiveExame>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
