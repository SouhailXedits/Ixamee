import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import LoginSvg from '../../_components/LoginSvg';
export default function page() {
  return (
    <div
      id="SignUpRoot"
      className=" bg-[#f0f6f8] flex flex-col overflow-x-hidden md:flex-row w-full"
    >
      {/* left */}

      {/* right */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  ">
        <div className="flex flex-col ml-3  items-start">
          <div className="text-center text-[#1b8392] text-4xl max-lg:text-2xl">
            Créez un compte
          </div>
        </div>
        <div className="flex flex-col gap-20 w-3/5 items-start">
          <form className="flex flex-col justify-between ml-3 gap-12 w-full items-start">form</form>
          <div className="flex flex-col gap-2 w-full items-center">
            <Button className="bg-[#99c6d3] w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75">
              S'inscrire
            </Button>
            <div className="flex text-base max-lg:text-xs ">
              <p className="text-center text-[#727272] ">Vous avez déjà un compte? </p>
              <Link className="text-center  text-[#1b8392] cursor-pointer" href={''}>
              &nbsp; Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" hidden flex-col justify-center  items-center gap-10 md:flex md:w-[70%]">
        <LoginSvg />
      </div>
    </div>
  );
}
