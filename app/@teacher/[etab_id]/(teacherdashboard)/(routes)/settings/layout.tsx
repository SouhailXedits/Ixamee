'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      redirect('/');
    }
  }, [user, redirect]);

  if (!user || user.role !== 'ADMIN') {
    return <Loading />;
  }

  return <main>{children}</main>;
};

export default SettingsLayout;
