import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import StatistiquesItems from "./statistiques-items";

const DashboradStatistiques = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
      <div className=" flex gap-4 items-center">
        <Image  alt="state img" src="dashboard/statistique/statistique.svg" width={22} height={22}/> 

        <span className=" text-[#727272] text-xl font-semibold  ">Statistiques Examens</span>
      </div>
      <div className="flex gap-3">
        {/* Classe */}
        <Select>
        <SelectTrigger className="w-[180px] rounded-xl">
          <SelectValue placeholder="Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">3_eme_info</SelectItem>
        </SelectContent>
      </Select>

      {/* Devoir */}
        <Select>
        <SelectTrigger className="w-[180px] rounded-xl">
          <SelectValue placeholder="Devoir" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Devoir de Controle</SelectItem>
        </SelectContent>
      </Select>

        

      </div>
      
    </div>
    <div >
      <StatistiquesItems/>
    </div>

    </div>
    
    );
}
 
export default DashboradStatistiques;