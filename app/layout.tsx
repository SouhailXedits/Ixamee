import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { auth as authentification } from '@/auth';
const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal'],
});
import './globals.css';
import { ToastProvider } from '@/components/providers/toaster-provider';
import QueryClientProviderWrapper from './providers/queryClientProvider';

import { Suspense } from 'react';
import Hydration from './providers/hydration';

export const metadata: Metadata = {
  title: 'Ixamee',
  description: 'Une seule plateforme pour tous vos examens',
  icons: 'https://jmp.sh/s/a0YrGJSvoHNaKuLij4cj',
};

export default async function RootLayout({
  student,
  teacher,
  auth,
  
}: {
  student: React.ReactNode;
  teacher: React.ReactNode;
  auth: React.ReactNode;
}) {
  const session = await authentification();

  return (
    <html lang="en">
      <body className={`font-normal ${poppins.className}`}>
        <QueryClientProviderWrapper>
          <Suspense>
            <Hydration >
              <ToastProvider />
              {/* {teacher} */}
              {session?.user?.role === 'STUDENT'
                ? student
                : session?.user?.role === 'TEACHER' || session?.user?.role === 'ADMIN'
                ? teacher
                : auth}
            </Hydration>
          </Suspense>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
