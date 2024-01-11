'use client';

import { googleLogin } from '@/actions/auth/googleLogin';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Social() {
  const [isPending, startTransition] = useTransition();
  //client side
  // const onClick = (provider: 'google') => {
  //   signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  // };
  //server side
  const onSubmit = () => {
    startTransition(() => {
      googleLogin();
    });
  };
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
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
