import Image from 'next/image';
import React from 'react';

type LogoProps = {
  className: string;
  width: number;
  height: number;
};

const AuthSvg = ({ className, width, height }: LogoProps) => {
  return (
    <Image src="/auth/authProfile.svg" alt="authSvg" width={width} height={height} className={className} />
  );
};

export default AuthSvg;
