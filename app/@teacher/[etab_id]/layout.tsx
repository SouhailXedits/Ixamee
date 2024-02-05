import React, { Suspense, use } from 'react';
import Loading from './loading';
import { useParams } from 'next/navigation';
import NewHydration from '@/app/providers/newhydration';
import { getMe } from '@/actions/examens';

export default async function page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { etab_id: string };
}) {
  const user = await getMe();
  console.log(user);
  return (
    <Suspense fallback={<Loading />}>
      <NewHydration etab_id={params.etab_id} user_id={user?.id}>
        <div>{children}</div>
      </NewHydration>
    </Suspense>
  );
}
