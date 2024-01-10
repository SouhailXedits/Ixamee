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
  title: 'Ixamee',
  description: 'Une seule plateforme pour tous vos examens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;

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
