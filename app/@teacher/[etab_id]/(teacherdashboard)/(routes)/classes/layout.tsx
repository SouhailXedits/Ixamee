import Loading from '@/app/loading';
import ClassHydration from '@/app/providers/classeHydration';

import React, { Suspense } from 'react';

const layout = ({ children, params }: { children: React.ReactNode; params: any }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <ClassHydration params={params}> */}
        {children}
      {/* </ClassHydration> */}
    </Suspense>
  );
};

export default layout;
