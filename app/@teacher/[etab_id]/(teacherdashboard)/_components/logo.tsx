"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Image from "next/image";


export const  Logo = () => {
  const {collapsed ,onCollapse ,onExpand } =useSidebar((state) =>state)  
  return (  
  <div className="flex items-center justify-between cursor-pointer">
      <Image
    height={100}
    width={100}
    alt="logo"
    src="/logo.svg"
    className={cn(collapsed && "hidden")}
    />
    

  
    {collapsed ? 
        <Image
        height={ 20}
        width={ 20}
        alt="menu"
        src="/whiteburrgermenuicon.svg"
        onClick={() =>onExpand()}
        /> : 
        <Image
        height={ 20}
        width={ 20}
        alt="menu"  
        src="/burrgermenuicon.svg"
        onClick={() =>onCollapse()}
        />
    }


  </div>


  );
}
 
export default  Logo;