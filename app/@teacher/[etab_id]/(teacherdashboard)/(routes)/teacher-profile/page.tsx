'use client';
import Image from 'next/image';
import ProfileCards from './_components/ProfileCards';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSubjectOfUserById } from '@/actions/examens';

const Profile = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;
  const userEstablishment = queryClient.getQueryData(['AllEstabOfUser']) as any;
  const teacherSubject = queryClient.getQueryData(['teacherSubject']) as any;

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mon profil</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Mon profil</span>
          </div>
        </div>
      </nav>

      <div>
        {!teacherSubject ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin border-mainGreen rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-b-2 border-gray-300"></div>
          </div>
        ) : (
          <ProfileCards
            user={user}
            userEstablishment={userEstablishment}
            teachersubject={teacherSubject}
          />
        )}
      </div>
    </main>
  );
};

export default Profile;
