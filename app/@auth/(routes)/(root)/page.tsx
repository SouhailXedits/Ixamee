import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from '../../_components/Logo';

export default function page() {
  return (
    <div
      id="SignUpRoot"
      className="bg-[#f0f6f8] flex flex-col justify-between w-full items-start  sm:flex-row"
    >
      {/* left */}
      <div className="flex flex-col justify-between gap-64 w-1/3 items-start mt-[-150px] ml-[-113px]">
        <div className="relative flex flex-row items-start w-1/2">
          <div
            id="Ellipse"
            className="w-4/5 h-[287px] bg-[#9dd600] absolute top-0 left-16 rounded-[50%]"
          />
          <div
            id="Ellipse1"
            className="bg-mainGreen relative mt-16 w-4/5 h-[250px] rounded-[50%]"
          />
        </div>
        <div className="flex flex-col items-start gap-24 ml-64">
          <div className="flex flex-row items-start w-full gap-5 ml-4">
            <Logo />
          </div>
          <div className="text-center font-[600] text-4xl font-semibold leading-[58.7px] text-[#4c4c4d] w-full">
            Une seule plateforme
            <br />
            pour tous vos <span className=" text-[#1b8392]">examens</span>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="bg-white flex flex-col justify-center pl-48 gap-24 w-3/5 h-[100vh]  items-start rounded-tl-[100px] rounded-bl-[100px]">
        <div className="flex flex-col items-start w-4/5 h-56 gap-20 ml-3">
          <div className="text-center text-5xl font-semibold text-[#1b8392]">Créez un compte</div>
        </div>
        <div className="flex flex-col items-start w-4/5 gap-20">
          <form className="flex flex-col items-start justify-between w-full gap-12 ml-3"></form>
          <div className="flex flex-col items-start w-full gap-2">
            <Button className="bg-[#99c6d3] w-full h-12 pt-2 items-start rounded-lg text-center text-white ">
              S'inscrire
            </Button>
            <div className="flex flex-row ml-[245px] gap-1 w-2/5 items-start">
              <div className="text-center text-[#727272]">Vous avez déjà un compte?</div>
              <a className="text-center font-medium text-[#1b8392]">Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
