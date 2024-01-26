'use client';
import {useQueryClient } from '@tanstack/react-query';
import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import DashboradStatistiques from './_components/dashborad-statistiques';

export default function Home() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  return (
    <div className="flex flex-col w-full h-full p-9">
      <div className="text-2 text-2xl font-semibold pl-4 ">Tableau de bord</div>
      <div className="flex gap-6 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-20 w-[60%] max-2xl:w-[100%] ">
          <DashboradApercu/>
          <DashboradStatistiques />
          
          <DashboradClasses />
        </div>

        <div className="w-[40%] p-2 flex flex-col gap-8 max-2xl:w-[100%]">
          <DashboradCorrectionsRecentes />
          <DashboradBulletinsDesEtudiants />
        </div>
      </div>
    </div>
  );
}
