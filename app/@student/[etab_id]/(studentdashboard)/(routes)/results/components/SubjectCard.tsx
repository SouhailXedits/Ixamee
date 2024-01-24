import { cn } from '@/lib/utils';
import Image from 'next/image';

function SubjectCard({ subject }: any) {
  const colors = ['#ECF1F9', '#FFF4F3', '#FFF4D3'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return (
    <div
      className={`w-[350px] justify-between h-[180px] py-[15px] rounded-[20px] flex flex-col gap-4 inline-fle p-5 pb-48 `}
      style={{
        backgroundColor: colors[randomIndex],
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image alt="MatierIcon" src={subject.icon} width={29} height={29} />
          <div>
            <span className="text-[#1B8392] text-lg  leading-[25px] font-semibold">
              {subject.name}{' '}
            </span>
            <span className=" text-mainGreen/70">({subject.classe_subject[0].name})</span>
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
        {subject.teacher[0].term === 'TRIMESTRE' ? (
          <p>Trimestre</p>
        ) : subject.teacher[0].term === 'SEMESTRE' ? (
          <p>Semestre</p>
        ) : (
          'Libre'
        )}
      </div>
      <div className="p-2 flex justify-between items-center w-full ">
        <div className="flex items-center gap-3">
          <Image alt="Teacher image" src={subject.teacher[0].image} width={29} height={29} />
          <div>
            <span className="text-[#1B8392] text-lg  leading-[25px]">Professeur:</span>
            <p>{subject.teacher[0].name}</p>
          </div>
        </div>
        <span className="bg-[#1B8392] w-24 p-1  text-white flex items-center justify-center rounded-lg font-extrabold text-[17px] hover:opacity-90 duration-150 cursor-pointer">
          Ouvrir
        </span>
      </div>
    </div>
  );
}

export default SubjectCard;
