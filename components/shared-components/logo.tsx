'use client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { redirect, useParams, useRouter } from 'next/navigation';

export const Logo = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const router = useRouter();
  const params = useParams();
  const { etab_id } = params;

  return (
    <div className="flex items-center justify-between cursor-pointer">
      <Image
        height={100}
        width={100}
        alt="logo"
        src="/logo.svg"
        className={cn(collapsed && 'hidden')}
        onClick={() => {
          router.push(`/${etab_id}`);
        }}
      />

      {collapsed ? (
        <Image
          height={20}
          width={20}
          alt="menu"
          src="/whiteburrgermenuicon.svg"
          // className="hidden md:block"
          onClick={() => onExpand()}
        />
      ) : (
        <Image
          height={20}
          width={20}
          alt="menu"
          src="/burrgermenuicon.svg"
          className="hidden md:block"
          onClick={() => onCollapse()}
        />
      )}
    </div>
  );
};

export default Logo;
