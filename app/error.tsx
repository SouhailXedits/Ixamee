'use client';
import React from 'react';


import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Errorr() {
  const router = useRouter();


  return (
    <div className="flex items-center justify-center w-full h-[100vh] text-center border">
      <div>
        {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.back()}
            type="button"
            className="mt-5 bg-red hover:opacity-80"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push('/')}
            type="button"
            className="mt-5 bg-[#1B8392] hover:opacity-80"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Errorr;
