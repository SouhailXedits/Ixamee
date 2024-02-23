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
  isParameters?: boolean;
  onClick?: () => void;
}
export const SidebarItem = ({
  Clickedicon,
  Defaulticon,
  label,
  href,
  isParameters,
  onClick: onClickHandler,
}: SidebarItemProps) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed } = useSidebar((state) => state);

  const isActive =
    (pathname === `/${params.etab_id}` && href === `/`) ||
    pathname === href ||
    (pathname.startsWith(`/${params.etab_id}${href}`) && href !== '/') ||
    (pathname.endsWith('/archive/exams') && href === '/archive/classes');

  const onClick = () => {
    if (href) router.push(`/${params.etab_id}${href}`);
    if (onClickHandler) onClickHandler()
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-start w-full  text-slate-500 text-sm font-[400] pl-3 transition-all pt-[4px] pb-[4px] ',
        !isActive && 'hover:bg-slate-300/20 hover:bg-[#f0f6f82a] hover:rounded-lg duration-300',
        isActive && 'bg-white   w-full text-mainGreen rounded-lg',
        isParameters && 'bg-2 rounded-lg text-white hover:bg-2/70',
        isParameters && isActive && 'bg-2/70'
      )}
    >
      <div className={cn('flex items-center w-full text-lg w gap-x-3 p-1', isActive && 'p-1')}>
        {isParameters && (
          <Image
            src={Defaulticon}
            // src={'/icons/kebab-menu.svg'}
            alt={Clickedicon}
            width={collapsed ? 22 : 22}
            height={collapsed ? 22 : 22}
            // className={cn('relative ', isActive && 'text-white  ')}
          />
        )}
        {!isParameters && (
          <Image
            src={isActive ? Clickedicon : Defaulticon}
            // src={'/icons/kebab-menu.svg'}
            alt={Clickedicon}
            width={collapsed ? 22 : 22}
            height={collapsed ? 22 : 22}
            className={cn('relative ', isActive && 'text-white  ')}
          />
        )}

        {collapsed ? '' : <span className=" font-[400]">{label}</span>}
        {isParameters && <span className=" font-[400]">{label}</span>}
      </div>
    </button>
  );
};
