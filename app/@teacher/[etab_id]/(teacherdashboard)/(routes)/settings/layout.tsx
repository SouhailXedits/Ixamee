'use client'
import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const queryclient = useQueryClient()

  const user = queryclient.getQueryData(['user']) as any;

  if (!user || user.role !== 'ADMIN') redirect('/');
  

  return (
      <main>
        {children}
      </main>

  );
};

export default SettingsLayout;
