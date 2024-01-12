"use client"
import Image from "next/image";
import { RadioGroup } from "@radix-ui/react-radio-group";
import {EtablissementItem} from "./etablissement-item";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
const Etablissement = () => {
  const {collapsed } =useSidebar((state) =>state)
  const lyceDetails = [
    {
      lyceName: "Lycée Bourguiba Sousse",
      subLyceName :"LBS",

      isChecked :false
    },
    {
      lyceName: "Lycée Privé Élite Nabeul",
      subLyceName :"LPEN",

      isChecked :false
    },
    {
      lyceName: "Lycée Al Manar",
      subLyceName :"LM",

      isChecked :false
    },
    
  ]
  return ( 
    <div className="border-t border-[#99C6D3] max-h-50">
      <div className="flex items-center gap-3 p-4">
      <Image src="/bankicon.svg" alt="bankicon" width={18} height={18}   />
      <span className={cn("text-[#99C6D3]" , collapsed && "hidden")}>Établissement</span>
      </div>
        <div className=" overflow-x-auto overflow-y-hidden max-h-52">

        <EtablissementItem data={lyceDetails}/>
        </div>
    </div>
  );
}
 
export default Etablissement;
