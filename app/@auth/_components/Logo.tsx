// Logo.js
import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <Image src="auth/logo.svg" alt="logo" width={400} height={250} className=' max-xl:w-[75%]'/>
  );
};

export default Logo;
