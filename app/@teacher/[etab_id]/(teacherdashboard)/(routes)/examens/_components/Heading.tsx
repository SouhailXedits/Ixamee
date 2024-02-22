import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddExameModal } from '@/components/modals/addExamesModal';

function Heading({ data, setData }: { data: string; setData: any }) {
  const handelRecherche = (e: any) => {
    setData(e.target.value);
  };
  return (
    <nav className="flex justify-between w-full max-md:pb-10 max-md:flex-col max-md:gap-3">
      <div className="flex flex-col gap-4">
        <div className="text-[#1B8392] text-2xl font-semibold ">Examens</div>
        <div className="flex items-center text-[#727272]">
          <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
          <span className="cursor-pointer">Examens</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4 h-14 cursor-pointe max-md:flex-col ">
        <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
          <Image src="/scoop.svg" alt="icons" width={20} height={20} />

          <input
            type="text"
            placeholder="Recherche"
            className=" w-24 bg-transparent outline-none border-none  text-sm  leading-tight placeholder-[#1B8392]"
            onChange={(e) => handelRecherche(e)}
          />
        </div>

        <AddExameModal>
          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Créer un examen
            </div>
          </div>
        </AddExameModal>
      </div>
    </nav>
  );
}

export default Heading;
