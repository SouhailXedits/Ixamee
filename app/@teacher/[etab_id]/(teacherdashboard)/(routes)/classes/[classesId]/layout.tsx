import Loading from '@/app/loading';
import ClassHydration from '@/app/providers/classeHydration';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React, { Suspense } from 'react';
import Errorr from './error';

const layout = ({ children, params }: { children: React.ReactNode; params: any }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ClassHydration params={params}>
      <div>{children}</div>
      </ClassHydration>
    </Suspense>
  );
};

export default layout;
