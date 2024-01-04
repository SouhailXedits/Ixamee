'use client';
import { cn } from '@/lib/utils';

const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main>{children}</main>
    </div>
  );
};

export default DashbordLayout;
