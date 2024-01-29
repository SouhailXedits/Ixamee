'use client';

import { googleLogin } from '@/actions/auth/googleLogin';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function SocialButton() {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(() => {
      googleLogin();
    });
  };
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        disabled={isPending}
        size="lg"
        className="w-full gap-2 hover:opacity-75"
        variant="outline"
        onClick={onSubmit}
      >
        <FcGoogle className="h-5 w-5 " /> Continue avec Google
      </Button>
    </div>
  );
}
