'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../../../../components/modals/Logo';
import SendEmailResetForm from '../../_components/SendEmailResetForm';

export default function ResetPassword() {
  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* left */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-br-[100px] md:rounded-tr-[100px]  gap-10 ">
        <div className="text-center text-2 text-4xl max-lg:text-3xl">Mot de passe oublié?</div>

        <div className="text-center text-base text-[#727272] w-full">
          Veuillez entrer votre e-mail pour réinitialiser votre mot de passe.&nbsp;
        </div>

        <div className="flex flex-col gap-5 w-3/5 items-start">
          <div className="w-full">
            <SendEmailResetForm />
          </div>
        </div>
      </div>
      {/* right */}
      <div className=" hidden flex-col justify-center  items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={' max-xl:w-[50%]'} width={300} height={200} />{' '}
        <div className="text-center  text-[#4c4c4d] w-full text-4xl max-lg:text-2xl  mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className=" text-2 hover:opacity-50 ">examens</span>
        </div>
      </div>
    </div>
  );
}
