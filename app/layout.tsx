import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { auth as authentification } from '@/auth';
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal'],
});
import './globals.css';
import { ToastProvider } from '@/components/providers/toaster-provider';
import QueryClientProviderWrapper from './providers/queryClientProvider';
import { getUserByEmail } from '@/data/user';
import { useQueryClient } from '@tanstack/react-query';
import Hydration from './providers/hydration';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
  console.log('🚀 ~ session:', session);
  
  // if (session?.user?.role === 'STUDENT' && session?.user.image.includes('googleusercontent')) {
  //   console.log('true');
  //   redirect('/home');
  // }
  return (
    <html lang="en">
      <body className={`font-normal ${poppins.className}`}>
        <QueryClientProviderWrapper>
          <Hydration>
            <ToastProvider />
            {/* {teacher} */}
            {session?.user?.role === 'STUDENT'
              ? student
              : session?.user?.role === 'TEACHER' || session?.user?.role === 'ADMIN'
              ? teacher
              : auth}
          </Hydration>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
