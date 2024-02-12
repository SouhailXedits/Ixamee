'use client';
import { DropdownMenuItemSelect } from '@/components/modals/drop-down';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface itemProps {
  id: number;
  name: string;
  NumberOfStudent: number;
  student_class: any;
}

const ClasseCard = ({ data }: { data: itemProps }) => {
  const route = useRouter();
  return (
    <div className="min-w-[195px] h-[190px] bg-[#F3F6F6] pt-3.5 rounded-xl flex flex-col justify-start items-center gap-[15px] ">
      <div className="flex justify-between w-full px-5">
        <span className="text-xl font-semibold  text-[#727272]">
          {data.name.length > 10 ? data.name.slice(0, 10) + '...' : data.name}
        </span>
        <DropdownMenuItemSelect data={data}>
          <Image
            src="/icons/kebab-menu.svg"
            alt="kebabMenu "
            width={19}
            height={19}
            className="cursor-pointer hover:opacity-80"
          />
        </DropdownMenuItemSelect>
      </div>
      <div className="w-full px-5  text-lg text-[#727272] pb-7 ">
        {data?.student_class?.length} Etudiants
      </div>

      <Link
        href={`classes/${data.id}`}
        key={data.id}
        className=" pl-3 pr-3 text-md font-[700] leading-tight text-center text-white"
      >
        <div className=" bg-[#1B8392]  p-2 rounded-lg cursor-pointer hover:opacity-80 pl-4 pr-4">
          Ouvrir
        </div>
      </Link>
    </div>
  );
};

export default ClasseCard;
