'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarItem } from '../../../../../components/shared-components/sidebar-item';
import SettingsBtn from './SettingsBtn';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getMe } from '@/actions/examens';

// }

const parametersRoutes = [
  {
    Clickedicon: '/teacherbag-fill.svg',
    Defaulticon: '/teacherbag.svg',
    label: 'Enseignants',
    href: '/settings/teachers',
  },
  {
    Clickedicon: '/establishement-fill.svg',
    Defaulticon: '/establishement.svg',
    label: 'Etablissement',
    href: '/settings/establishements',
  },
  {
    Clickedicon: '/subjects-fill.svg',
    Defaulticon: '/subjects.svg',
    label: 'Matières',
    href: '/settings/subjects',
  },
];

function ParametersSidebar() {
  const queryclient = useQueryClient();
  const { collapsed } = useSidebar((state) => state);

  const [isActive, setIsActive] = useState<boolean>(false);
  function onClick() {
    setIsActive((prev) => !prev);
  }
  const paramroutes = parametersRoutes;


  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: async() => getMe()
  })


  console.log(user)

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger onClick={onClick} className={cn(collapsed && 'flex-col')}>
          <SettingsBtn isActive={isActive} onClick={onClick} />
        </AccordionTrigger>
        <AccordionContent className={cn(' flex flex-col gap-2', !collapsed && 'ml-4')}>
          {paramroutes.map((route) => (
            <SidebarItem
              key={route.href}
              Clickedicon={route.Clickedicon}
              Defaulticon={route.Defaulticon}
              label={route.label}
              href={route.href}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ParametersSidebar;
