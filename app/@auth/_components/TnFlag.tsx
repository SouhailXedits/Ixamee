// Logo.js
import Image from 'next/image';
import React from 'react';

type LogoProps = {
  className:string
  width:number
  height:number
}

const TnFlag = ({className,width,height}:LogoProps) => {
  return (
    <Image src="auth/tnFlag.svg" alt="tn" width={width} height={height} className={className}/>
  );
};

export default TnFlag;
