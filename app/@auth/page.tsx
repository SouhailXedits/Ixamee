import React from 'react';

import { auth } from '@/auth';
import { getUserById } from '@/data/user';
import { redirect } from 'next/navigation';
import GoogleAfterForm from './_components/google-after-form';
import Logo from './_components/Logo';
export default async function GoogleAfter() {
  const session = (await auth()) as any;
  if (!session) {
    redirect('/login');
  }
  const existingUser = await getUserById(session?.user.id);
  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* left */}
      <div className=" hidden flex-col justify-center  items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={' max-xl:w-[50%]'} width={300} height={200} />{' '}
        <div className="text-center  text-[#4c4c4d] w-full text-4xl max-lg:text-2xl  mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className=" text-2 hover:opacity-50 ">examens</span>
        </div>
      </div>
      {/* right */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-bl-[100px] md:rounded-tl-[100px] md:rounded-tr-none  gap-10 ">
        <div className="text-center text-2 text-4xl max-lg:text-3xl">Vous êtes presque arrivé</div>
        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
            <GoogleAfterForm session={existingUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
