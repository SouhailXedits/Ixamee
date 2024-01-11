import DashboradApercu from './_components/dashborad-apercu';
import DashboradBulletinsDesEtudiants from './_components/dashborad-bulletins-des-etudiants';
import DashboradClasses from './_components/dashborad-classes';
import DashboradCorrectionsRecentes from './_components/dashborad-corrections-recentes';
import DashboradStatistiques from './_components/dashborad-statistiques';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full p-9">
      <div className="text-[#1B8392] text-xl font-semibold ">Tableau de bord</div>
      <div className="flex gap-3 pt-10 flex-nowrap max-2xl:flex-wrap">
        {/* first section 👺  */}
        <div className=" flex flex-col gap-12 w-[71%] max-2xl:w-[100%] ">
          <DashboradApercu />
          <DashboradStatistiques />
          <DashboradClasses />
        </div>

        <div className="w-[29%] p-2 flex flex-col gap-8 max-2xl:w-[100%]">
          <DashboradCorrectionsRecentes />
          <DashboradBulletinsDesEtudiants />
        </div>
      </div>
    </div>
  );
}
