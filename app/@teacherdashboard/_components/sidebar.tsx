import { cn } from "@/lib/utils";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = ({isOpen} :{isOpen :boolean}) => {
  return (
    <div className={cn("w-full h-full overflow-y-auto border-r shadow-sm felx flex:col bg-mainGreen" , isOpen && " bg-mainGreen")}>
      <div className={cn("p-4 border-none bg-silver" , isOpen && "bg-mainGreen p-5   text-sky-700")} >
        <Logo /> 
      </div>

      <div className="flex flex-col h-full p-1 font-normal text-white " >
        <SidebarRoutes/>

      </div>
    </div>
  );
}
 
export default Sidebar;