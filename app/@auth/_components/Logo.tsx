// Logo.js
import Image from 'next/image';
import React from 'react';

type LogoProps = {
  className:string
  width:number
  height:number
}

const Logo = ({className,width,height}:LogoProps) => {
  return (
    <Image src="auth/logo.svg" alt="logo" width={width} height={height} className={className}/>
  );
};

export default Logo;
