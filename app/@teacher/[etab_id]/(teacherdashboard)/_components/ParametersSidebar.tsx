'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SettingsBtn from './SettingsBtn';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getMe } from '@/actions/examens';
import { ParametersRoute } from '@/types/parameters'; // Added type import

const parametersRoutes: ParametersRoute[] = [
  // ...
];

function ParametersSidebar() {
  const queryClient = useQueryClient();
  const { collapsed } = useSidebar((state) => state);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getMe(),
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  function onClick() {
    setIsActive((prev) => !prev);
  }

  if (isLoading) {
    return <Skeleton className="h-6 w-6" />;
  }

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger onClick={onClick} className={cn(collapsed && 'flex-col')}>
          <SettingsBtn isActive={isActive} onClick={onClick} />
        </AccordionTrigger>
        <AccordionContent className={cn(' flex flex-col gap-2', !collapsed && 'ml-4')}>
          {user &&
            parametersRoutes.map((route) => (
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
