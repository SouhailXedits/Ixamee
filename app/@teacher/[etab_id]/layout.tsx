import React, { Suspense } from 'react';
import Loading from './loading';

export default function page({ children }: { children: React.ReactNode }) {
  console.log('dash');
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>
    </Suspense>
  );
}
