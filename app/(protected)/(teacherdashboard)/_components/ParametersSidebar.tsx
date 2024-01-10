import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarItem } from './sidebar-item';
import SettingsBtn from './SettingsBtn';


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
  const paramroutes = parametersRoutes;
  
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <SettingsBtn/>
        </AccordionTrigger>
        <AccordionContent className=" flex flex-col gap-2">
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
