import Image from 'next/image';
import CorrectionsRecentes from './corrections-recentes-item';
import BulletinsDesEtudiants from './bulletins-des-etudiants';
import Link from 'next/link';

const DashboradBulletinsDesEtudiants = ({ etabId }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Image src="dashboard/bulttin/bulletinsIcon.svg" alt="correct" width={21} height={21} />
          <span className=" text-[#727272] text-xl font-[600] ">Bulletins des étudiants</span>
        </div>
        <div className="text-[#1B8392] cursor-pointer text-lg font-medium  underline">
          <Link href={`/${etabId}/bulletins`}>Voir plus (0)</Link>
        </div>
      </div>

      <BulletinsDesEtudiants etabId={etabId}/>
    </div>
  );
};

export default DashboradBulletinsDesEtudiants;
