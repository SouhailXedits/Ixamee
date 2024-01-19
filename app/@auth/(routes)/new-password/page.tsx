'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../../_components/Logo';
import SendEmailResetForm from '../../_components/SendEmailResetForm';
import ResetForm from '../../_components/ResetForm';

interface VerificationData {
  email?: string;
  code?: number;
}

export default function NewPassword() {
  const [verificationData, setVerificationData] = useState<VerificationData>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = JSON.parse(localStorage.getItem('new-verification') || '{}');
      setVerificationData(storedData);
    }
  }, []);

  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* left */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  gap-10 max-sm:mt-28">
        <div className="text-center text-[#1b8392] text-4xl max-lg:text-3xl">
          Créer un nouveau <br /> mot de passe
        </div>

        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="w-full">
            <ResetForm email={verificationData.email}/>
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
