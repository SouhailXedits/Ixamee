'use client';
import Image from 'next/image';
import ProfileCards from './_components/ProfileCards';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEstablishmentOfUser, getSubjectOfUserById } from '@/actions/examens';

const Profile = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const { data: userEstablishment, isPending: isPendingEstablishment } = useQuery<any>({
    queryKey: ['AllEstabOfUser'],
    queryFn: async () => await getEstablishmentOfUser(user?.id as string),
    staleTime: 0,
  });
  console.log(userEstablishment ,"userEstablishment");

  const { data: teacherSubject, isPending: isPendingSubject } = useQuery<any>({
    queryKey: ['teacherSubjects'],
    queryFn: async () => await getSubjectOfUserById(user?.id as string),
    staleTime: 0,
  });

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mon profile</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Mon profile</span>
          </div>
        </div>
      </nav>

      <div>
        {isPendingSubject ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-r-2 border-gray-300 border-blue-500 rounded-full animate-spin border-mainGreen"></div>
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
