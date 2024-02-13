'use client';
import Image from 'next/image';
import React from 'react';

function Errorr() {
  return (
    <div>
      <Image src={'./notFoundSvg.svg'} width={300} height={300} alt="not found page" />
      Error
    </div>
  );
}

export default Errorr;
