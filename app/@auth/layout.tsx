'use client';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal'],
});
import '@/app/globals.css';
const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`font-normal ${poppins.className} h-full`}>
      <main>{children}</main>
    </div>
  );
};

export default DashbordLayout;
