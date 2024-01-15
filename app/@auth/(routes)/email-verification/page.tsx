// 'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../../_components/Logo';
import Link from 'next/link';
import VerifForm from '../../_components/VerifForm';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { useSearchParams } from 'next/navigation';
export default async function EmailVerification() {
  const [verificationData, setVerificationData] = useState({});
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = JSON.parse(localStorage.getItem('email-verification') || '{}');
      setVerificationData(storedData);
    }
  }, []);

  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* left */}

      <div className=" hidden flex-col justify-center  items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={' max-xl:w-[50%]'} width={300} height={200} />{' '}
        <div className="text-center  text-[#4c4c4d] w-full text-4xl max-lg:text-2xl  mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className=" text-[#1b8392] hover:opacity-50 ">examens</span>
        </div>
      </div>
      {/* right */}

      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-bl-[100px] md:rounded-tl-[100px] md:rounded-tr-none  gap-10 max-sm:mt-28">
        <div className="text-center text-[#1b8392] text-4xl max-lg:text-3xl">
          Vérifiez votre E-mail
        </div>

        <div className="text-center text-base text-[#727272] w-full">
          Veuillez entrer le code envoyé sur l’e-mail&nbsp;
          <span className="text-lg text-[#102528]">
            {verificationData?.email ? verificationData?.email : '*******@****.***'}
          </span>
          <div>afin de vérifier votre compte,</div>
        </div>

        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="w-full">
            <VerifForm />
          </div>
          <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
            <div className="flex ">
              <p className="text-center text-[#727272] ">Vous n&apos;avez pas reçu le code? </p>
              &nbsp;
              <Link
                className="text-center text-[#1b8392] hover:underline font-semibold"
                href={''}
                // onClick={async () => {
                //   verificationData !== null &&
                //     (await sendVerificationEmail(verificationData?.email, verificationData?.code));
                //  
                // }}
              >
                Renvoyez
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
