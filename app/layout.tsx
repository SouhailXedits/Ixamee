import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { auth as authentification } from '@/auth';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal'],
});
import './globals.css';
import { ToastProvider } from '@/components/providers/toaster-provider';
import QueryClientProviderWrapper from './providers/queryClientProvider';
import { getUserByEmail } from '@/data/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Hydration from './providers/hydration';
import { getEstablishmentOfUser } from '@/actions/examens';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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

  // console.log(session?.user)
  // if(session?.user) {
  //   const estabs = await getEstablishmentOfUser(session?.user.id)
  //   console.log(estabs)
  //   redirect(`/${estabs[0].id}/classes`)
  // }
  // const {data} = useQuery( {
  //   queryKey: ['userEstab'],
  //   queryFn: getEstablishmentOfUser(session?.user.id)
  // })

  return (
    <html lang="en">
      <body className={`font-normal ${poppins.className}`}>
        <QueryClientProviderWrapper>
          <Suspense>
            {/* <Hydration> */}
            <ToastProvider />
            {/* {teacher} */}
            {session?.user?.role === 'STUDENT'
              ? student
              : session?.user?.role === 'TEACHER' || session?.user?.role === 'ADMIN'
              ? teacher
              : auth}
          </Suspense>
          {/* </Hydration> */}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
