import Image from 'next/image';
import CorrectionsRecentes from './corrections-recentes-item';
import Link from 'next/link';

const DashboradCorrectionsRecentes = ({ etabId, classes }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between max-md:flex-wrap">
        <div className="flex items-center gap-4">
          <Image
            src="dashboard/correctexamp/corectionsRecentes.svg"
            alt="correct"
            width={21}
            height={21}
          />
          <span className=" text-[#727272] text-xl font-semibold ">Corrections </span>
        </div>
        <div className="text-[#1B8392] cursor-pointer text-lg font-medium  underline">
          <Link href={`/${etabId}/examens`}>Voir plus (0)</Link>
        </div>
      </div>

      <CorrectionsRecentes etabId={etabId} classes={classes} />
    </div>
  );
};

export default DashboradCorrectionsRecentes;
