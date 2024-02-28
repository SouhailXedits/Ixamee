import { getMe } from '@/actions/examens';
import Loading from '@/app/loading';
import ClassHydration from '@/app/providers/classeHydration';
import NewHydration from '@/app/providers/newhydration';
import React, { Suspense } from 'react';

const layout = async ({ children, params }: { children: React.ReactNode; params: any }) => {
  const user = await getMe();

  return (
    <Suspense fallback={<Loading />}>
      <NewHydration user_id={user?.id} etab_id={params?.etab_id}>
        <div>{children}</div>
      </NewHydration>
    </Suspense>
  );
};

export default layout;
