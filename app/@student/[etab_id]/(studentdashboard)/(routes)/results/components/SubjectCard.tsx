import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function SubjectCard({ subject, etab_id }: any) {
  const colors = ['#ECF1F9', '#FFF4F3', '#FFF4D3'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return (
    <div
      className={`w-[350px] justify-between h-[180px] py-[15px] rounded-[20px] flex flex-col gap-4 inline-fle p-5 pb-48 overflow-hidden `}
      style={{
        backgroundColor: colors[randomIndex],
      }}
    >
      <div className="flex items-center justify-between relative ">
        <Image
          src={`/icons/icon-${randomIndex + 1}.svg`}
          className=" absolute -top-4 -right-6"
          alt={`${subject.name}-icon`}
          height={80}
          width={80}
        />
        <div className="flex items-center gap-3 z-0">
          <Image alt="MatierIcon" src={subject.icon} width={35} height={35} />
          <div className='whitespace-nowrap w-full truncate'>
            <span className="text-[#1B8392] text-lg  leading-[25px] font-semibold">
              {subject.name}{' '}
            </span>
            <span className=" text-mainGreen/70 truncate ">({subject.classe_subject[0].name})</span>
            <p className="text-mainGreen/70">coefficient : {subject.coefficient}</p>
          </div>
        </div>
      </div>

      {/* <div className="flex pt-10 pb-6 w-full items-center justify-center text-center font-semibold text-[#4C4C4D] -space-x-2 overflow-hidden ">
        <Image
          src="userAvatar/user1.svg"
          alt="userAvate"
          width={40}
          height={40}
          className="inline-block  rounded-full "
        />
        <Image
          src="userAvatar/user2.svg"
          alt="userAvate"
          width={40}
          height={40}
          className="inline-block rounded-full "
        />
        <Image
          src="userAvatar/user3.svg"
          alt="userAvate"
          width={40}
          height={40}
          className="inline-block  rounded-full "
        />
        <div className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center text-[#1B8392]">
          <span className="flex items-center justify-center">22</span>
        </div>
      </div> */}
      <div className="items-center justify-center text-center text-[#4C4C4D]">
        {subject?.teacher[0]?.term === 'TRIMESTRE' ? (
          <p>Trimestre</p>
        ) : subject?.teacher[0]?.term === 'SEMESTRE' ? (
          <p>Semestre</p>
        ) : (
          'Libre'
        )}
      </div>
      <div className="p-2 flex justify-between items-center w-full ">
        <div className="flex items-center gap-3">
          <Image
            alt="Teacher image"
            src={subject.teacher[0]?.image || '/defaultUserAvatr.svg'}
            width={40}
            height={40}
            className=" rounded-full"
          />
          <div>
            <span className="text-[#1B8392] text-lg  leading-[25px] ">Professeur:</span>
            <p className=" w-32 truncate">{subject.teacher[0]?.name || 'inconnue'}</p>
          </div>
        </div>
        <Link
          href={`/${etab_id}/results/${subject.id}`}
          className="bg-[#1B8392] w-24 p-1  text-white flex items-center justify-center rounded-lg font-extrabold text-[17px] hover:opacity-90 duration-150 cursor-pointer"
        >
          Ouvrir
        </Link>
      </div>
    </div>
  );
}

export default SubjectCard;
