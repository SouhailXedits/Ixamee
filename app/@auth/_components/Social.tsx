'use client';

import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export default function Social() {
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full gap-2 hover:opacity-75"
        variant="outline"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5 " /> Continue avec Google
      </Button>
    </div>
  );
}
