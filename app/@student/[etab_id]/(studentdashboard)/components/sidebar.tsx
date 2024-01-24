import { cn } from '@/lib/utils';;
import { SidebarRoutes } from '../../../../../components/shared-components/sidebar-routes';
import Logo from '@/components/shared-components/logo';



const guestRoutes = [
  {
    Clickedicon: '/dashboardicon.svg',
    Defaulticon: '/defaultdashboardicon.svg',
    label: 'Tableau de bord',
    href: '/',
  },

  {
    Clickedicon: '/bulletinsicon.svg',
    Defaulticon: '/defaultbulletinsicon.svg',
    label: 'Mes résultats',
    href: '/results',
  },
  {
    Clickedicon: '/calendriericon.svg',
    Defaulticon: '/defaultcalendriericon.svg',
    label: 'Calendrier',
    href: '/calendrier',
  },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        'w-full h-full  border-r shadow-sm felx flex:col bg-mainGreen',
        isOpen && ' bg-mainGreen'
      )}
    >
      <div className={cn('p-4 border-none bg-silver', isOpen && 'bg-mainGreen p-5   text-sky-700')}>
        <Logo />
      </div>

      <div className="flex flex-col h-full p-1 font-normal text-white ">
        <SidebarRoutes guestRoutes={guestRoutes} />
      </div>
    </div>
  );
};

export default Sidebar;
