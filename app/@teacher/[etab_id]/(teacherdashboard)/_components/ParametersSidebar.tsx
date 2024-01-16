'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarItem } from './sidebar-item';
import SettingsBtn from './SettingsBtn';
import { useState } from 'react';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
// import { useSidebar } from '@/store/use-sidebar';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';

// function SettingsBtn() {
//   const { collapsed } = useSidebar((state) => state);
//   const [isActive, setIsActive] = useState<Boolean>();
//   function onClick() {
//     setIsActive((prev) => !prev);
//   }
//   return (
//     <button
//       onClick={onClick}
//       type="button"
//       className={cn(
//         'flex items-start w-full  text-slate-500 text-sm font-[400] pl-3 transition-all',
//         !isActive && 'hover:bg-slate-300/20 hover:bg-[#f0f6f82a] hover:rounded-lg duration-300',
//         isActive && 'bg-white  w-full text-mainGreen rounded-lg'
//       )}
//     >
//       <div className={cn('flex items-center w-full text-lg w gap-x-3 p-1', isActive && 'p-1')}>
//         <Image
//           src={isActive ? '/settings-fill.svg' : '/settings-fill.svg'}
//           // src={'/icons/kebab-menu.svg'}
//           alt="settings icon"
//           width={collapsed ? 20 : 17}
//           height={collapsed ? 20 : 17}
//           className={cn('relative ', isActive && 'text-white  ')}
//         />

//         {collapsed ? '' : 'Paramètres'}
//       </div>
//     </button>
//   );
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
  const queryclient = useQueryClient()
  const { collapsed } = useSidebar((state) => state);

  const [isActive, setIsActive] = useState<boolean>(false);
  function onClick() {
    setIsActive((prev) => !prev);
  }
  const paramroutes = parametersRoutes;
  
  const user = queryclient.getQueryData(['user']) as any


  if(!user || user.role!== 'ADMIN') return null
  

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger onClick={onClick} className={cn(collapsed&& "flex-col")}>
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
