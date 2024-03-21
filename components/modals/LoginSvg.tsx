// LoginSvg.js
import Image from 'next/image';
import React, { forwardRef } from 'react';

const LoginSvg = forwardRef((props, ref) => {
  return (
    <div className="animate-bounce repeat-infinite max-xl:w-[75%] transition-all duration-1">
      <Image
        src="/auth/loginSvg.svg"
        alt="LoginSvg"
        width={400}
        height={250}
        decoding="async"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default LoginSvg;
