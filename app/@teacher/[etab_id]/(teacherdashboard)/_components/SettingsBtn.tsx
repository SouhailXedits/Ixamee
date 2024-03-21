import { useSidebar } from '@/store/use-sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { boolean } from 'zod';

type SettingBtnProps = {
  onClick: () => void;
  isActive: boolean;
};

type CnProps = {
  active: string;
  inactiveHover: string;
  inactive: string;
};

const cnProps = {
  active: 'w-full text-mainGreen rounded-lg',
  inactiveHover: 'hover:bg-slate-300/20  hover:rounded-lg duration-300',
  inactive: 'w-full text-slate-500 text-sm font-[400] pl-3 transition-all',
};

function SettingsBtn({ onClick, isActive }: SettingBtnProps) {
  const { collapsed } = useSidebar((state) => state);

  return (
    <p
      className={cn(
        cnProps.inactive,
        isActive ? cnProps.active : cnProps.inactiveHover
      )}
    >
      <span className={cn('flex items-center w-full text-lg w gap-x-3 p-1')}>
        <Image
          src={isActive ? '/settings-fill.svg' : '/settings.svg'}
          alt=""
          title={isActive ? 'Active settings icon' : 'Inactive settings icon'}
          width={collapsed ? 20 : 20}
          height={collapsed ? 20 : 20}
          className={cn('relative
