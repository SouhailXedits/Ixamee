'use client';
import Image from 'next/image';
import ProfileCards from './_components/ProfileCards';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserEstablishmentByUserId } from '@/data/user';
import { getSubjectOfUserById } from '@/actions/examens';

const Profile = async () => {
  const queryClient = useQueryClient();
  
  const user = queryClient.getQueryData(['user']) as any;
  const userEstablishment = queryClient.getQueryData(['AllEstabOfUser']) as any;
  const teachersubject = queryClient.getQueryData(['teachersubjects']) as any;

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
        <ProfileCards
          user={user}
          userEstablishment={userEstablishment}
          teachersubject={teachersubject}
        />
      </div>
    </main>
  );
};

export default Profile;
