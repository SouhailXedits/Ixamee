'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface SidebarItemProps {
  clickedIcon: string;
  defaultIcon: string;
  label: string;
  href?: string;
}

export const SidebarItem = ({
  clickedIcon,
  defaultIcon,
  label,
  href,
}: SidebarItemProps) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar((state) => state);

  const isActive =
    (!href && pathname === `/${params.etab_id}`) ||
    (href && (pathname === href || pathname.startsWith(`/${params.etab_id}${href}`))) ||
    (pathname.endsWith('/archive/exams') && href === '/archive/classes');

  const onClick = () => {
    if (href) router.push(`/${params.etab_id}${href}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      className={cn(
        'flex items-start w-full  text-slate-500 text-sm font-[400] pl-3 transition-all pt-[4px] pb-[4px] ',
        !isActive && 'hover:bg-slate-300/20 hover:bg-[#f0f6f82a] hover:rounded-lg duration-300',
        isActive && 'bg-white   w-full text-mainGreen rounded-lg'
      )}
    >
      <div className={cn('flex items-center w-full text-lg w gap-x-3 p-1', isActive && 'p-1')}>
        <Image
          src={isActive ? clickedIcon : defaultIcon}
          alt={label}
          width={collapsed ? 22 : 22}
          height={collapsed ? 22 : 22}
          className={cn('relative ', isActive && '
