'use client';
import { DropdownMenuItemSelect } from '@/components/modals/drop-down';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface itemProps {
  id: number;
  name: string;
  number_students?: number;
  class?: string
  archived_at: string;
}


const ArchiverCard = ({ data }: { data: itemProps }) => {
  const route = useRouter();
  return (
    <div className="w-[275px] h-[190px] bg-[#F3F6F6] pt-3.5 rounded-xl flex flex-col justify-start items-center gap-[15px] ">
      <div className="flex justify-between w-full px-5">
        <span className="text-xl font-semibold  text-[#727272]">{data.name}</span>
        {/* <DropdownMenuItemSelect data={data}>
          <Image
            src="/icons/kebab-menu.svg"
            alt="kebabMenu "
            width={19}
            height={19}
            className="cursor-pointer hover:opacity-80"
          />
        </DropdownMenuItemSelect> */}
        <Image src="/expand-icon.svg" alt="expand icon" height={20} width={20} />
      </div>
      {data.number_students && <div className="w-full px-5 font-[600] text-lg text-[#727272]">
        {data.number_students} étudiants
      </div>}
      {data.class && <div className="w-full px-5 font-[600] text-lg text-[#727272]">
        {data.class}
      </div>}
      <div className="w-full px-5 font-[600] text-sm text-[#727272] ">
        <p>Archivé le: {data.archived_at}</p>
      </div>

      <button
        className=" pl-3 pr-3 text-md font-[700] leading-tight text-center text-white mt-3"
      >
        <span className=" bg-[#1B8392]  p-2 rounded-lg cursor-pointer hover:opacity-80 pl-4 pr-4">
          Restaurer
        </span>
      </button>
    </div>
  );
};

export default ArchiverCard;
