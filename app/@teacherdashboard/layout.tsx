"use client"
import { useSidebar } from "@/store/use-sidebar";
import Sidebar from "./_components/sidebar";
import { cn } from "@/lib/utils";
import Navbar from "./_components/navbar";

const DashbordLayout = ({
  children
} : {
  children :React.ReactNode
}
) => {
  const {collapsed } =useSidebar((state) =>state)
  return (  
    <div className="h-full">
      <div className={cn("fixed inset-y-0 z-50 flex-col hidden h-full w-[220px] md:flex transition-width duration-300",collapsed && "w-[60px]" )}>
        <Sidebar isOpen={collapsed}/>
      </div>
      <div>
      <Navbar />
      </div>
      <main className={cn(!collapsed ? "pl-[225px] transition-all duration-500" : "pl-[63px] transition-all duration-500")}>
      {children}
      </main>
    
    </div>
    
    );
}
 
export default DashbordLayout;