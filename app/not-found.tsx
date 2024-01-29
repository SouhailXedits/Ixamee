import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Logo from '../components/modals/Logo';
import LoginSvg from '../components/modals/LoginSvg';

export default function NotFound() {
  return (
    <div
      id="SignUpRoot"
      className=" bg-[#f0f6f8] flex flex-col overflow-x-hidden md:flex-row w-full"
    >
      {/* left */}

      <div className="bg-white w-full flex flex-col justify-center h-[100vh] gap-8 items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  ">
        <div className="flex flex-col ml-3 gap-5 items-center">
          <Logo className={' max-xl:w-[50%]'} width={200} height={100} />
          <div className="text-center text-[#F04438] text-3xl max-lg:text-2xl"></div>
          <h1>Page non trouvée</h1>
          <p>Désolé, la page que vous recherchez est introuvable.</p>

          <Link href="/login" className="w-full text-center ">
            <Button className="bg-[#ed6157] w-2/5 h-10 pt-2 font-semibold items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75">
              <IoReturnUpBackOutline /> &nbsp; Retournez
            </Button>
          </Link>
        </div>
      </div>
      {/* right */}
      <div className=" hidden flex-col justify-center  items-center gap-10 md:flex md:w-[70%] max-md:text-sm max-sm:text-xs">
        <LoginSvg />
      </div>
    </div>
  );
}
