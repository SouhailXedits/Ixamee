import { cn } from '@/lib/utils';
import Logo from '../../../../../components/shared-components/logo';
import { SidebarRoutes } from '../../../../../components/shared-components/sidebar-routes';

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
    label: 'Bulletins',
    href: '/bulletins',
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
    href: '/archive/classes',
  },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        'w-full h-full  border-r shadow-sm felx flex:col  bg-mainGreen',
        isOpen && ' bg-mainGreen'
      )}
    >
      <div className={cn('p-4 border-none bg-silver', isOpen && 'bg-mainGreen p-5   text-sky-700')}>
        <Logo />
      </div>

      <div className="flex flex-col justify-end h-full p-1 font-normal text-white item-end z-[999]">
        <SidebarRoutes guestRoutes={guestRoutes} />
      </div>
    </div>
  );
};

export default Sidebar;
