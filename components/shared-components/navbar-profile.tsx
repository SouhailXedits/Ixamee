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
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getMe } from '@/actions/examens';

type NavbarProfileProps = {
  etab_id: string;
};

const NavbarProfile = ({ etab_id }: NavbarProfileProps) => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    error,
  }: UseQueryResult<any, Error> = useQuery<any, Error>({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
    onError: (error) => console.error(error),
  });

  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="rounded-full">
        <Image
          alt="picture Student"
          src={user?.image || '/studenttestpicture.svg'}
          width={35}
          height={35}
          className="object-fill rounded-full"
        />
      </div>

      <div className="flex flex-col items-start">
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
          {user.role === 'TEACHER' || user.role === 'ADMIN' ? (
            <DropdownMenuItem
              onClick={() => {
                router.push(`/${params.etab_id}/teacher-profile`);
              }}
              className="cursor-pointer "
            >
              Mon profil
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                router.push(`/${params.etab_id}/student-profile`);
              }}
              className="cursor-pointer "
            >
              Mon profil
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer "
          >
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarProfile;
