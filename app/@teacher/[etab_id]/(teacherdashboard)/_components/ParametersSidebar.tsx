import React, { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarItem } from '../../../../../components/shared-components/sidebar-item';
import SettingsBtn from './SettingsBtn';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getMe } from '@/actions/examens';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const { collapsed } = useSidebar((state) => state);

  const [isActive, setIsActive] = useState<boolean>(false);
  const popoverRef = useRef<any>(null);
  const triggerButtonRef = useRef<any>(null);
  function onClick() {
    setIsActive((prev) => !prev);
  }
  function handleMouseEnter() {
    setIsActive(true);
  }
  const paramroutes = parametersRoutes;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        event.target !== triggerButtonRef.current &&
        !triggerButtonRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const accordionRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutsideAccordion(event: any) {
      if (accordionRef.current && !accordionRef.current.contains(event.target) && isActive) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideAccordion);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideAccordion);
    };
  }, [isActive]);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getMe(),
  });

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className={cn(!collapsed && 'w-full', '')}>
      {collapsed ? (
        <Popover open={isActive}>
          <PopoverTrigger onClick={onClick} ref={triggerButtonRef} onMouseEnter={handleMouseEnter}>
            <SettingsBtn isActive={isActive} onClick={onClick} isParameters={true} />
          </PopoverTrigger>
          <PopoverContent
            className="absolute flex flex-col gap-2  -top-7 left-9 text-2"
            ref={popoverRef}
          >
            {paramroutes.map((route) => (
              <SidebarItem
                key={route.href}
                Clickedicon={route.Clickedicon}
                Defaulticon={route.Defaulticon}
                label={route.label}
                href={route.href}
                isParameters={true}
                onClick={onClick}
              />
            ))}
          </PopoverContent>
        </Popover>
      ) : (
        <Accordion type="single" collapsible className="w-full" ref={accordionRef}>
          <AccordionItem value="item-1">
            <AccordionTrigger
              onClick={onClick}
              className={cn(collapsed && 'flex-col', !collapsed && 'px-2', 'accordion-settings')}
            >
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
      )}
    </div>
  );
}

export default ParametersSidebar;
