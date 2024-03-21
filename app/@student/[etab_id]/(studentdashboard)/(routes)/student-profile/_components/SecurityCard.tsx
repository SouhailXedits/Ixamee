import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UpdatePassword } from './UpdatePassword';

type SecurityCardProps = {
  user: {
    password?: string;
  };
};

type UpdatePasswordProps = {
  currentUser: {
    password?: string;
  };
  title: string;
  disabled: boolean;
};

export default function SecurityCard({ user }: SecurityCardProps) {
  const { password } = user;
  const isGoogleUser = !password;

  return (
    <div className="w-[50%] h-full p-5 flex flex-col gap-6 rounded-xl shadow-lg max-xl:w-full">
      <div className="text-[#1B8392] text-lg">Sécurité et authentification</div>
      <div className="flex items-center justify-center">
        <FontAwesomeIcon icon={faLock} className="text-gray-500 w-16 h-16" />
      </div>
      <UpdatePassword
        currentUser={user}
        title={isGoogleUser ? 'Mot de passe Google' : 'Modifier mot de passe'}
        disabled={
