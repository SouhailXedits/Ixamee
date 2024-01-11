'use client';
import { SidebarItem } from './sidebar-item';
import Etablissement from './etablissement';
import ParametersSidebar from './ParametersSidebar';

const guestRoutes = [
  {
    Clickedicon: '/dashboardicon.svg',
    Defaulticon: '/defaultdashboardicon.svg',
    label: 'Tableau de bord',
    href: '/',
  },
  {
    Clickedicon: '/classesicon.svg',
    Defaulticon: '/defaultclassesicon.svg',
    label: 'Classes',
    href: '/classes',
  },
  {
    Clickedicon: '/examensicon.svg',
    Defaulticon: '/defaultexamensicon.svg',
    label: 'Examens',
    href: '/examens',
  },
  {
    Clickedicon: '/bulletinsicon.svg',
    Defaulticon: '/defaultbulletinsicon.svg',
    label: 'Bullentis',
    href: '/bullentis',
  },
  {
    Clickedicon: '/calendriericon.svg',
    Defaulticon: '/defaultcalendriericon.svg',
    label: 'Calendrier',
    href: '/calendrier',
  },
  {
    Clickedicon: '/archiveicon.svg',
    Defaulticon: '/defaultarchiveicon.svg',
    label: 'Archive',
    href: '/archive',
  }
];





export const SidebarRoutes = () => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex flex-col items-start gap-4 mt-14">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            Clickedicon={route.Clickedicon}
            Defaulticon={route.Defaulticon}
            label={route.label}
            href={route.href}
          />
        ))}
        <ParametersSidebar/>
      </div>
      <div className="flex flex-col absolute bottom-0">
        <Etablissement />
      </div>
    </div>
  );
};
