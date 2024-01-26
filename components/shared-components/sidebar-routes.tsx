'use client';
import { SidebarItem } from './sidebar-item';
import Etablissement from '../../app/@teacher/[etab_id]/(teacherdashboard)/_components/etablissement';
import ParametersSidebar from '../../app/@teacher/[etab_id]/(teacherdashboard)/_components/ParametersSidebar';
import Classes from '@/app/@student/[etab_id]/(studentdashboard)/components/Classes';

export const SidebarRoutes = ({ guestRoutes }: any) => {
  return (
    <div className="flex flex-col w-full gap-10 overflow-auto justify-between">
      <div className="flex flex-col items-start gap-4 mt-14">
        {guestRoutes.map((route: any) => (
          <SidebarItem
            key={route.href}
            Clickedicon={route.Clickedicon}
            Defaulticon={route.Defaulticon}
            label={route.label}
            href={route.href}
          />
        ))}
        {guestRoutes[1].href !== '/results' && <ParametersSidebar />}
      </div>
      <div className="flex flex-col">
        {guestRoutes[1].href === '/results' ? <Classes /> : <Etablissement />}
      </div>
    </div>
  );
};
