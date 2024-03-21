import Loading from '@/app/loading';
import React, { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>
    </Suspense>
  );
};

export default Layout;
