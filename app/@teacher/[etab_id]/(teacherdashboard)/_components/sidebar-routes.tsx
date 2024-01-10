'use client';
import { SidebarItem } from './sidebar-item';
import Etablissement from './etablissement';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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
  },
];

const parametersRoutes = [
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
  }
  
];



export const SidebarRoutes = () => {
  const routes = guestRoutes;
  const currentRoute = usePathname();

  return (
    <div className="flex flex-col w-full gap-52">
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            
          >
            <AccordionTrigger>
              <p>Parametrès</p>
            </AccordionTrigger>
            <AccordionContent className=" flex flex-col gap-2">
              <Link
                href="/settings/teachers"
                className={`hover:bg-white/30 p-2 rounded-lg ${
                  currentRoute === '/settings/teachers' ? 'bg-white/30' : ''
                }`}
              >
                Enseignants
              </Link>
              <Link
                href="/settings/subjects"
                className={`hover:bg-white/30 p-2 rounded-lg ${
                  currentRoute === '/settings/subjects' ? 'bg-white/30' : ''
                }`}
              >
                Matières
              </Link>
              <Link
                href="/settings/establishements"
                className={`hover:bg-white/30 p-2 rounded-lg ${
                  currentRoute === '/settings/establishements' ? 'bg-white/30' : ''
                }`}
              >
                Etablissement
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col w-full mt-auto ">
        <Etablissement />
      </div>
    </div>
  );
};
