import React from 'react';
import Link from 'next/link';
import SocialButton from '@/components/modals/SocialButton';
import Logo from '@/components/modals/Logo';
import RegisterForm from '../../_components/RegisterForm';
export default function page() {
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
        <div className="text-center text-2 text-4xl max-lg:text-3xl">Créez un compte</div>
        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
            <RegisterForm />
            <SocialButton />
            <div className="flex ">
              <p className="text-center text-[#727272] max-md:text-sm max-sm:text-xs ">
                Vous avez déjà un compte?{' '}
              </p>
              &nbsp;
              <Link
                className="text-center text-mainGreen hover:underline text-base font-semibold max-md:text-sm max-sm:text-xs "
                href={'/login'}
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
