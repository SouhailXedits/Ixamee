import React from 'react';
import AuthSvg from './AuthSvg';
import { UpdatePassword } from './UpdatePassword';

type UserProps = {
  user: {
    password?: string;
  };
};

type UpdatePasswordProps = {
  currentUser: UserProps['user'];
  onClick: () => void;
};

export default function SecurityCard({ user }: UserProps) {
  const hasPassword = Boolean(user.password);
  const buttonLabel = hasPassword ? 'Modifier mot de passe' : 'Vous êtes de Google, vous ne pouvez pas mettre à jour votre mot de passe ixamee';

  return (
    <div className="w-[50%] h-full  p-5 flex flex-col gap-6  rounded-xl shadow-lg max-xl:w-full">
      <div className="text-[#1B8392] text-lg">Sécurité et authentification</div>
      <div className="flex items-center justify-center">
        <AuthSvg className={' max-xl:w-
