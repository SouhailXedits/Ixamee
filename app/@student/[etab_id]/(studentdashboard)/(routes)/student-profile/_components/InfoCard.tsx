import React from 'react';
import Image from 'next/image';

type User = {
  name: string;
  email: string;
  image?: string;
};

type Establishment = {
  name: string;
};

type Classe = {
  name: string;
};

type Props = {
  user: User;
  userEstablishment?: Establishment[];
  classe?: Classe[];
};

export default function InfoCard({ user, userEstablishment, classe }: Props) {
  const { name, email, image } = user;

  return (
    <div className="w-[50%] p-5 rounded-xl shadow-lg max-xl:w-full flex flex-col gap-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-5 rounded-full">
          <div className="flex w-[100px] h-[100px] rounded-full ">
            <Image
              src={image || '/defaultUserAvatar.svg'}
              alt="uploadImage"
              width={100}
              height={100}
              className="rounded-full cursor-pointer hover:opacity-75 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="text-[#1B8392] text-lg">Personal Information</div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Name <br />
            <span className="text-[#727272] font-light">{name}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Email <br />
            <span className="text-[#727272] font-light">{email}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Establishment <br />
            <span className="text-[#727272] font-light">
              {userEstablishment && userEstablishment.length
                ? userEstablishment.map((estab: Establishment) => (
                    <span key={estab.name}>{estab.name}</span>
                  ))
                : 'Your teacher has not chosen an establishment'}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-full">
          <p className="text-[#727272] pl-3">
            Classes <br />
            <span className="text-[#727272] font-light">
              {classe && classe.length
                ? classe.map((classe: Classe) => 
