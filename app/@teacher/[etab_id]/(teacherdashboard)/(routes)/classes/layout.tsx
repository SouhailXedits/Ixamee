import Loading from '@/app/loading';
import React, { Suspense } from 'react';

const layout = ({ children, params }: { children: React.ReactNode; params: any }) => {
;

  return (
    <Suspense fallback={<Loading />}>
      {/* <NewHydration params={params}> */}
      <div>{children}</div>
      {/* </NewHydration> */}
    </Suspense>
  );
};

export default layout;
