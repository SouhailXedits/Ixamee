import React, { Suspense } from 'react';
import Loading from './loading';

export default function page({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>
    </Suspense>
  );
}
