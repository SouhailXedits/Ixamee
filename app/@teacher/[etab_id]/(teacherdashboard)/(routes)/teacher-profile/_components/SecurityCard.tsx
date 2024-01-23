import React from 'react';
import AuthSvg from './AuthSvg';
import { UpdatePassword } from './UpdatePassword';

export default function SecurityCard({ user }: any) {
  return (
    <div className="w-[50%] h-full  p-5 flex flex-col gap-6  rounded-xl shadow-lg max-xl:w-full">
      <div className="text-[#1B8392] text-lg">Sécurité et authentification</div>
      <div className="flex items-center justify-center">
        <AuthSvg className={' max-xl:w-[50%]'} width={300} height={200} />
      </div>
      {user.password ? (
        <div className="flex justify-center w-full cursor-pointer ">
          <UpdatePassword currentUser={user}>
            <div className="text-red border-solid border-2  border-red w-full flex items-center justify-center p-3 rounded-lg ">
              Modifier mot de passe
            </div>
          </UpdatePassword>
        </div>
      ) : (
        <div className="flex justify-center w-full cursor-pointer ">
          <div className="text-red border-solid border-2  border-red w-full flex items-center justify-center p-3 rounded-lg ">
            Vous êtes de Google, vous ne pouvez pas mettre à jour votre mot de passe ixamee
          </div>
        </div>
      )}
    </div>
  );
}
