import Image from "next/image";
import ApercuItem from "./apercu-Item";

const DashboradApercu = () => {
  const items =[
    {
      itemName : "Mes classes",
      itemColor :"#FFF4F3",
      itemIcon  :"dashboard/apercu/classesicon.svg",
      itemStat : "-",
      textColor:"#F04438"

    },
    {
      itemName : "Mes étudiants",
      itemColor :"#F0F6F8",
      itemIcon  :"dashboard/apercu/etudiants.svg",
      itemStat : "-",
      textColor:"#1B8392"

    },
      {
      itemName : "Mes examens",
      itemColor :"#D1FADF",
      itemIcon  :"dashboard/apercu/examens.svg",
      itemStat : "-",
      textColor:"#12B76A"

    },
      {
      itemName : "Mon archive",
      itemColor :"#FFF4D3",
      itemIcon  :"dashboard/apercu/archive.svg",
      itemStat : "-",
      textColor:"#F69D16"

    }
    
  ]
  return ( 

    <div className="flex flex-col gap-5">
      <div className="flex gap-3"><Image 
      alt="apercu"
      src="dashboard/apercu.svg"
      width={20}
      height={20}
      />
      <span className="text-xl font-[600]  text-[#727272]">Aperçu</span></div>

      <div className="flex gap-2 max-2xl:flex-wrap">
        {
          items.map((item)=>(
            <ApercuItem 
              key={item.itemColor}
            color={item.itemColor}
            icon={item.itemIcon}
            stat={item.itemStat}
            name={item.itemName}
            textColor= {item.textColor}
            />

          ))

        }

      </div>
    </div>
   );
}
 
export default DashboradApercu;