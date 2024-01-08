// Importing specific components and hooks separately
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const ExamCards = () => {
  const router = useRouter();

  const onClick = () => {
    console.log('clicked');
    router.push('/examens/22323');
  };

  return (
    <div
      className="w-[333px] h-[190px] bg-[#F3F6F6] p-3 rounded-3xl flex flex-col gap-2"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <span className="text-[#514E4E]">Devoir de contrôle N°2</span>
        <Image src="/icons/kebab-menu.svg" alt="icons" width={20} height={20} />
      </div>

      <div className="w-[293px] text-[#D2D1D1] text-sm font-normal leading-snug text-lg">
        Créé le: 12/12/22
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="mt-[20px] w-[65px] h-7 px-1.5 rounded-[100px] border border-[#1B8392] inline-flex truncate">
          <div className="flex gap-[2px] items-center justify-start grow shrink basis-0 text-xs font-medium leading-snug whitespace-nowrap text-[#1B8392]">
            3<sup className="font-normal text-[5px]">éme </sup> Techniques_2
          </div>
        </div>

        <div
          className="flex  h-[47px] inline-flex mt-[18px] bg-[#1B8392] rounded-xl items-end w-full justify-start flex-col items-center text-[#FFFFFF]"
          style={{ width: '54px' }}
        >
          <span className="text-ms">0% </span>
          <span className="text-xs">Corrigé</span>
        </div>
      </div>

      <Progress value={20} className="w-[100%] h-2 bg-white mt-3" />
    </div>
  );
};

export default ExamCards;
