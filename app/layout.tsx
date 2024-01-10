import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal'],
});
import './globals.css';
import { ToastProvider } from '@/components/providers/toaster-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  student,
  teacherdashboard,
  auth,
}: {
  children: React.ReactNode;
  student: React.ReactNode;
  teacherdashboard: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-normal ${poppins.className}`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
