import { classNames } from '@/lib/utils';
import React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
