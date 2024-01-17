'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  if (!user) return null

  if (user.role !== 'ADMIN') {
    return <div>{redirect('/')}</div>;
  }

  return <main>{children}</main>;
};

export default SettingsLayout;
