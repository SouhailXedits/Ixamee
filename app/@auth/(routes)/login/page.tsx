import React from 'react';
import Link from 'next/link';
import LoginSvg from '../../_components/LoginSvg';
import LoginForm from '../../_components/LoginForm';
import Social from '../../_components/Social';
import Logo from '../../_components/Logo';
export default function page() {
  return (
    <div
      id="SignUpRoot"
      className=" bg-[#f0f6f8] flex flex-col overflow-x-hidden md:flex-row w-full"
    >
      {/* left */}

      <div className="bg-white w-full flex flex-col justify-center h-[100vh] gap-8 items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  ">
        <div className="flex flex-col ml-3 gap-5 items-center">
          <Logo className={' max-xl:w-[50%]'} width={200} height={100} />
          <div className="text-center text-2 text-4xl max-lg:text-3xl">Connectez-vous</div>
        </div>
        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="w-full">
            <LoginForm />
          </div>
          <div className="flex flex-col gap-3 w-full items-center">
            <Social />

            <div className="flex">
              <p className="text-center text-[#727272] max-md:text-sm max-sm:text-xs">
                Vous n’avez pas un compte?{' '}
              </p>
              &nbsp;
              <Link
                className="text-center text-mainGreen hover:underline text-base font-semibold max-md:text-sm max-sm:text-xs "
                href={'/register'}
              >
                S’inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className=" hidden flex-col justify-center  items-center gap-10 lg:flex md:w-[70%] max-md:text-sm max-sm:text-xs">
        <LoginSvg />
      </div>
    </div>
  );
}
