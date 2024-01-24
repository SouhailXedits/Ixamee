import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { boolean } from 'zod';

interface settingBtnProps {
  onClick: () => void;
  isActive: boolean;
}
function SettingsBtn({ onClick, isActive }: settingBtnProps) {
  const { collapsed } = useSidebar((state) => state);

  return (
    <p
      className={cn(
        'flex items-start w-full  text-slate-500 text-sm font-[400] pl-3 transition-all',
        !isActive && 'hover:bg-slate-300/20  hover:rounded-lg duration-300',
        isActive && ' w-full text-mainGreen rounded-lg'
      )}
    >
      <span className={cn('flex items-center w-full text-lg w gap-x-3 p-1')}>
        <Image
          src={isActive ? '/settings-fill.svg' : '/settings.svg'}
          // src={'/icons/kebab-menu.svg'}
          alt="settings icon"
          width={collapsed ? 20 : 20}
          height={collapsed ? 20 : 20}
          className={cn('relative ', isActive && 'text-white  ')}
        />

        {collapsed ? '' : <span className=' font-extralight'>Paramètres</span>}
      </span>
    </p>
  );
}

export default SettingsBtn;