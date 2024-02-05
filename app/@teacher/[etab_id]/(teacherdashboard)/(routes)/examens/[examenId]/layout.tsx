import Loading from '@/app/loading';
import ExmaHydration from '@/app/providers/exmaHydration';
import React, { Suspense } from 'react';

function layout({ children, params }: { children: React.ReactNode; params: { examenId: string } }) {
  const { examenId } = params;
  return (
    <Suspense fallback={<Loading />}>
      <ExmaHydration exam_id={examenId}>
        <div>{children}</div>
      </ExmaHydration>
    </Suspense>
  );
}

export default layout;
