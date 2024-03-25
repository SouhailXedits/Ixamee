'use client';
import Image from 'next/image';
import { ConfirmUnarchiveModel } from './ConfirmUnarchiveModal';
import { useParams, useRouter } from 'next/navigation';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
interface itemProps {
  id: number;
  name: string;
  number_students?: number;
  exam_classess?: {
    id: number;
    name: string;
  }[];
  archived_at?: string;
}

const ArchiverCard = ({ data }: { data: itemProps }) => {
  //   const route = useRouter();
  const isExam = data.exam_classess !== undefined;
  const params = useParams();
  const estabId = params.etab_id;
  const router = useRouter();

  return (
    <div className="bg-[#F3F6F6] pt-3.5 rounded-xl flex flex-col justify-start items-center gap-[15px] border-[2px] border-[#1B8392] border-dashed  ">
      <div className="flex justify-between w-full px-5">
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="text-[#1B8392] text-lg font-semibold  leading-[25px]">
              {data.name?.length > 20 ? data.name?.slice(0, 20) + '...' : data.name}
            </span>
            {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
          </HoverCardTrigger>
          <HoverCardContent className="text-[#727272]  break-words w-[200px] text-md">
            <span className="font-semibold  text-[#727272]">{data.name}</span>
          </HoverCardContent>
        </HoverCard>

        {/* <DropdownMenuItemSelect data={data}>
          <Image
            src="/icons/kebab-menu.svg"
            alt="kebabMenu "
            width={19}
            height={19}
            className="cursor-pointer hover:opacity-80"
          />
        </DropdownMenuItemSelect> */}
        <button
          name="btn"
          onClick={() => {
            router.push(`/${estabId}/${isExam ? 'examens' : 'classes'}/${data.id}`);
          }}
        >
          <Image src="/expand-icon.svg" alt="expand icon" height={20} width={20} />
        </button>
      </div>
      {/* {data.number_students && ( */}
      <div className="w-full px-5 font-[600] text-lg text-[#727272]">
        {data.number_students} étudiants
      </div>
      {/* )} */}
      {data.exam_classess && (
        <div className="w-full px-5 font-[600] text-lg text-[#727272]">
          {data.exam_classess?.map((classe): any => (
            <p key={classe.id}>{classe.name}</p>
          ))}
        </div>
      )}
      <div className="w-full px-5 font-[600] text-sm text-[#727272] ">
        <p>Archivé le: {data.archived_at?.toLocaleString() || 'date unconnué '}</p>
      </div>
      <ConfirmUnarchiveModel id={data.id} isExam={isExam}>
        <button className=" pl-3 pr-3 text-md font-[700] leading-tight text-center text-white mt-3 mb-5">
          <span className=" bg-[#1B8392]  p-2 rounded-lg cursor-pointer hover:opacity-80 pl-4 pr-4">
            Restaurer
          </span>
        </button>
      </ConfirmUnarchiveModel>
    </div>
  );
};

export default ArchiverCard;
