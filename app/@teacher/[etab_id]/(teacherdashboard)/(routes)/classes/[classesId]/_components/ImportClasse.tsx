import { ImportUneClasse } from "@/components/modals/importer-une-classe";
import Image from "next/image";

function ImportClasse({ classesId, etab_id  }: any) {
  return (
    <>
      <ImportUneClasse class_id={classesId} etab_id={etab_id} >
        <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
          <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
          <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">Importer</div>
        </div>
      </ImportUneClasse>
    </>
  );
}

export default ImportClasse
