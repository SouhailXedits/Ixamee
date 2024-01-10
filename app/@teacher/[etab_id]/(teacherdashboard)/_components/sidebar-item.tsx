import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

function SettingsBtn() {
  const { collapsed } = useSidebar((state) => state);
  const [isActive, setIsActive] = useState<Boolean>()
  function onClick() {
    setIsActive(prev => !prev)
  }
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
          src={isActive ? '/settings-fill.svg' : '/settings-fill.svg'}
          // src={'/icons/kebab-menu.svg'}
          alt="settings icon"
          width={collapsed ? 20 : 17}
          height={collapsed ? 20 : 17}
          className={cn('relative ', isActive && 'text-white  ')}
        />

        {collapsed ? '' : 'Paramètres'}
      </div>
    </button>
  );
}

export default SettingsBtn;
