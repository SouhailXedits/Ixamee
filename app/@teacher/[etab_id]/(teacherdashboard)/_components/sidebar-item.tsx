'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface SidebarItemProps {
  Clickedicon: string;
  Defaulticon: string;
  label: string;
  href?: string;
}
export const SidebarItem = ({ Clickedicon, Defaulticon, label, href }: SidebarItemProps) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar((state) => state);
  console.log(`/${params.etab_id}${href}`);
  const isActive =
    (pathname === `/${params.etab_id}` && href === `/`) ||
    pathname === href ||
    (pathname.startsWith(`/${params.etab_id}${href}` ) && href !== '/');

  const onClick = () => {
    if (href) router.push(`/${params.etab_id}${href}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-start w-full  text-slate-500 text-sm font-[400] pl-3 transition-all',
        !isActive && 'hover:bg-slate-300/20 hover:bg-[#f0f6f82a] hover:rounded-lg duration-300',
        isActive && 'bg-white  w-full text-mainGreen rounded-lg'
      )}
    >
      <div className={cn('flex items-center w-full text-lg w gap-x-3 p-1', isActive && 'p-1')}>
        <Image
          src={isActive ? Clickedicon : Defaulticon}
          // src={'/icons/kebab-menu.svg'}
          alt={Clickedicon}
          width={collapsed ? 20 : 17}
          height={collapsed ? 20 : 17}
          className={cn('relative ', isActive && 'text-white  ')}
        />

        {collapsed ? '' : label}
      </div>
    </button>
  );
};
