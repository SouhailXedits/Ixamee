import React from 'react';
import Logo from '../../_components/Logo';
import Link from 'next/link';
import Social from '../../_components/Social';
import RegisterForm from '../../_components/RegisterForm';
import VerifForm from '../../_components/VerifForm';
export default function page() {
  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* left */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-br-[100px] md:rounded-tr-[100px]   gap-10 max-sm:mt-28">
        <div className="text-center text-[#1b8392] text-4xl max-lg:text-3xl">
          Vérifiez votre E-mail
        </div>
        <div className="text-center text-base text-[#727272] w-full">
          Veuillez entrer le code de vérification envoyé à<span> </span>
          <span className="text-lg text-[#102528]">****@gmail.com</span>
          <span className="text-lg">
            .<br />
          </span>
          <div>Le code expire dans 00.32.</div>
        </div>
        <VerifForm/>
        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
            <div className="flex ">
              <p className="text-center text-[#727272] ">Vous n&apos;avez pas reçu le code? </p>
              &nbsp;
              <Link
                className="text-center text-[#1b8392] hover:underline font-semibold"
                href={''}
              >
                Renvoyez
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className=" hidden flex-col justify-center  items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={' max-xl:w-[50%]'} width={300} height={200} />{' '}
        <div className="text-center  text-[#4c4c4d] w-full text-4xl max-lg:text-2xl  mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className=" text-[#1b8392] hover:opacity-50 ">examens</span>
        </div>
      </div>
    </div>
  );
}
