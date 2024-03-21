'use client';
import Image from 'next/image';
import React from 'react';

const ErrorPage = () => {
  return (
    <div>
      <Image
        src="/notFoundSvg.svg" // remove the dot before the slash for correct path
        alt="not found page"
        width={300}
        height={300}
      />
      <h1>Error</h1> {/* add heading tag for better accessibility */}
    </div>
  );
};

export default ErrorPage;
