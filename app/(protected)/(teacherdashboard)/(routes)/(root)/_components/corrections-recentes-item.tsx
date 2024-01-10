import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import ExamCorrectionList from "./exam-correction-list";

const CorrectionsRecentes = () => {
  return ( 

    // No Correct Recentes  
    // <div className="w-full border h-[367.10px] rounded-xl flex items-center justify-center flex-col gap-5">
    //   <Image src="dashboard/correctexamp/videCorrectionRecentes.svg" alt="ilustartor" width={250} height={250}/>

    //   {/* <span className="text-[#1B8392] text-lg font-semibold">Pas d’examens pour le moment</span> */}

    //   <div className="flex items-center justify-center cursor-pointer ">
    //     <span className="p-2 text-white rounded-lg bg-mainGreen hover:opacity-80">
    //     Ajouter un examen
    //   </span>
    //   </div>
    // </div>

    <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-3">
        {/* Classe */}
        <Select>
        <SelectTrigger className="w-[140px] rounded-xl">
          <SelectValue placeholder="Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">3_eme_info</SelectItem>
        </SelectContent>
      </Select>

      {/* Devoir */}
        <Select>
        <SelectTrigger className="w-[140px] rounded-xl">
          <SelectValue placeholder="Devoir" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Devoir de Controle</SelectItem>
        </SelectContent>
      </Select>

        

      </div>
      <div className="w-full border h-[367.10px] rounded-xl">
        <ExamCorrectionList/>


      </div>

    </div>
    );
}
 
export default CorrectionsRecentes;