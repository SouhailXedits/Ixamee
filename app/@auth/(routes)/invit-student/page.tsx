import React from 'react';
import Logo from '../../_components/Logo';
import Image from 'next/image';
import InvitForm from '../../_components/invit-form';
import Link from 'next/link';
export default function page() {
  return (
    <div id="SignUpRoot" className=" bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* Left section */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center  md:rounded-br-[100px] md:rounded-tr-[100px] gap-10">
        <div className="text-center text-[#1b8392] text-4xl max-lg:text-3xl">
          Bienvenue à Ixamee
        </div>
        <div className="flex flex-col items-start w-3/5 text-[#1b8392] text-xl gap-5">
          Créons votre compte
        </div>
        <div className="w-full bg-[#F0F6F8]">
          <div className="w-3/5 ml-[14rem]">
            <p className=" text-sm mt-2 text-[#727272]"> Vous avez été invité par:</p>
            <div className="flex gap-10 items-center py-5">
              <Image
                alt="picture Student"
                src={'/studenttestpicture.svg'}
                width={75}
                height={75}
                className="rounded-full object-fill"
              />
              <div>
                <ul className="flex flex-col gap-3">
                  <li>Mohamed Ben Khlifa</li>
                  <li className="text-gray  ">
                    classe:<span className=" text[#727272] font-extralight"> 7eme</span>
                  </li>
                  <li className="text-gray  ">
                    Matière:<span className="text[#727272] font-extralight"> Français</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-3/5 gap-2">
          <p className=" font-medium text-[#727272]">L’adresse e-mail de votre compte est</p>
          <p>assma-gued@gmail.com</p>

          <InvitForm />
          <div className="flex w-full justify-center">
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
      {/* Right section */}
      <div className=" hidden flex-col justify-center  items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={' max-xl:w-[50%]'} width={300} height={200} />
        <div className="text-center  text-[#4c4c4d] w-full text-4xl max-lg:text-2xl  mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className=" text-[#1b8392] hover:opacity-50 ">examens</span>
        </div>
      </div>
    </div>
  );
}
