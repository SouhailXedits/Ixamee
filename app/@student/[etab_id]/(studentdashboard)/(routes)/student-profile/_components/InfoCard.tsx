import React from 'react';
import Image from 'next/image';


export default function InfoCard({ user, userEstablishment, classe }: any) {
  const { name, email, image } = user;

  return (
    <div className="w-[50%] p-5 rounded-xl shadow-lg max-xl:w-full flex flex-col gap-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-5 rounded-full">
          <div className="flex w-[100px] h-[100px] rounded-full ">
            <Image
              src={image || '/defaultUserAvatr.svg'}
              alt="uplodImage"
              width={100}
              height={100}
              className="rounded-full cursor-pointer hover:opacity-75 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="text-[#1B8392] text-lg">Informations personnelles</div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Nom et prénom <br />
            <span className="text-[#727272] font-light">{name}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            E-mail <br />
            <span className="text-[#727272] font-light">{email}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Établissement <br />
            <span className="text-[#727272] font-light">
              {userEstablishment && userEstablishment.length
                ? userEstablishment.map((estab: any) => estab?.name)
                : 'Votre professeur ne choisi la classe'}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Classe (s) <br />
            <span className="text-[#727272] font-light">
              {classe && classe.length
                ? classe.map((classe: any) => classe?.name)
                : 'Votre professeur ne choisi la classe'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
