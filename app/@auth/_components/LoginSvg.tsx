// LoginSvg.js
import Image from 'next/image';
import React from 'react';

const LoginSvg = () => {
  return (
    <div className="animate-bounce repeat-infinite max-xl:w-[75%] transition-all duration-1">
      <Image src="/auth/loginSvg.svg" alt="LoginSvg" width={400} height={250} />
    </div>
  );
};

export default LoginSvg;
