'use client';
import React, { Suspense } from 'react';
import Loading from './loading';
import { useParams } from 'next/navigation';
import NewHydration from '@/app/providers/newhydration';

export default function page({ children }: { children: React.ReactNode }) {
  const params = useParams();
  console.log(params);

  return (
    <Suspense fallback={<Loading />}>
      {/* <NewHydration etab_id={params.etab_id}> */}
      <div>{children}</div>
      {/* </NewHydration> */}
    </Suspense>
  );
}
