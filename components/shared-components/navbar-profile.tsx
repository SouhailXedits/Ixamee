'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
import { logout } from '@/actions/auth/logout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getMe } from '@/actions/examens';

const NavbarProfile = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  // const user = queryClient.getQueryData(['user']) as any;
  const { data: user, isPending: estabPending } = useQuery<any>({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
  });

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-5 justify-center">
      <div className="rounded-full">
        <Image
          alt="picture Student"
          src={user?.image || '/studenttestpicture.svg'}
          width={35}
          height={35}
          className="rounded-full object-fill"
        />
      </div>

      <div className="flex flex-col items-start pr-10">
        <span className="w-[120px] text-[#1B8392] text-sm font-semibold whitespace-nowrap ">
          {user?.name}{' '}
        </span>
        <span className="w-[120px] text-[#99C6D3] text-xs font-thin ">
          {user.role === 'ADMIN' ? 'Admin' : user.role === 'TEACHER' ? 'Professeur' : 'Etudiant'}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button name="bnt" variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <Image
              alt="arrowDOwn"
              src="/arrowdown.svg"
              width={14}
              height={14}
              className="cursor-pointer "
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem> */}
          {/* <ModifierUnEtudiant> */}
          {/* <Image
                  src="/eyesicon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer "
                /> */}
          {/* <p className="rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent ">
              Modifier
            </p> */}
          {/* <DropdownMenuItem>Modifier</DropdownMenuItem> */}
          {/* </ModifierUnEtudiant> */}
          <DropdownMenuItem
            onClick={() => {
              if (user.role === 'TEACHER' || user.role === 'ADMIN') {
                router.push(`/${params.etab_id}/teacher-profile`);
              } else {
                router.push(`/${params.etab_id}/student-profile`);
              }
            }}
            className=" cursor-pointer"
          >
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await logout();
            }}
            className=" cursor-pointer"
          >
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <div>
        <Image
          alt="arrowDOwn"
          src="/arrowdown.svg"
          width={14}
          height={14}
          className="cursor-pointer "
        />
      </div> */}
    </div>
  );
};

export default NavbarProfile;
