import Loading from '@/app/loading';
import React, { Suspense } from 'react';

export default function page({ children }: { children: React.ReactNode }) {
  console.log('student')
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>
    </Suspense>
  );
}
