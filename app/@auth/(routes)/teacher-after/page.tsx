import React from 'react';
import Logo from '../../../../components/modals/Logo';
import GoogleAfterForm from '../../_components/google-after-form';
import ProfAfterForm from '../../_components/Prof-after-form';

// TeacheAfter component
const TeacheAfter = () => {
  return (
    <div
      id="SignUpRoot"
      className="bg-[#f0f6f8] flex flex-col md:flex-row w-full"
    >
      {/* Left section */}
      <div className="hidden flex-col justify-center items-center gap-8 lg:flex md:w-[70%]">
        <Logo
          className={'max-xl:w-[50%]'}
          width={300}
          height={200}
          alt="Platform logo"
        />
        <div className="text-center text-[#4c4c4d] w-full text-4xl max-lg:text-2xl mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className="text-2 hover:opacity-50 ">examens</span>
        </div>
      </div>

      {/* Right section */}
      <div className="bg-white w-full flex flex-col justify-center items-center md:rounded-bl-[100px] md:rounded-tl-[100px] md:rounded-tr-none gap-10">
        <div className="text-center text-2 text-4xl max-lg:text-3xl">
          Vous êtes presque arrivé
        </div>
        <div
