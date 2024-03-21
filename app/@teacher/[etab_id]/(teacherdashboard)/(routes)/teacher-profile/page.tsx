'use client';
import Image from 'next/image';
import ProfileCards from './_components/ProfileCards';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEstablishmentOfUser, getSubjectOfUserById } from '@/actions/examens';

const Profile = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const { data: userEstablishment, isPending: isPendingEstablishment, error: errorEstablishment, ...userEstablishmentQuery } = useQuery<any>({
    queryKey: ['AllEstabOfUser'],
    queryFn: async () => await getEstablishmentOfUser(user?.id as string),
    staleTime: 0,
    onError: (error: any) => console.error('Error fetching user establishments: ', error),
  });

  const { data: teacherSubject, isPending: isPendingSubject, error: errorSubject, ...teacherSubjectQuery } = useQuery<any>({
    queryKey: ['teacherSubjects'],
    queryFn: async () => await getSubjectOfUserById(user?.id as string),
    staleTime: 0,
    onError: (error: any) => console.error('Error fetching teacher subjects: ', error),
  });

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mon profil</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="Back arrow" width={20} height={20} />
            <span className="cursor-pointer">Mon profil</span>
          </div>
        </div>
      </nav>

      <div>
        {isPendingSubject || isPendingEstablishment ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin border-mainGreen rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-b-2 border-gray-300"></div>
          
