import Loading from '@/app/loading';
import ClassHydration from '@/app/providers/classeHydration';
import React, { Suspense } from 'react';

const layout = ({ children, params }: { children: React.ReactNode; params: any }) => {
  console.log(params);

  return (
    <Suspense fallback={<Loading />}>
      <ClassHydration params={params}>
      <div>{children}</div>
      </ClassHydration>
    </Suspense>
  );
};

export default layout;