import { cn } from '@/lib/utils';
import { SidebarRoutes } from '../../../../../components/shared-components/sidebar-routes';
import Logo from '@/components/shared-components/logo';

const guestRoutes = [
  {
    label: 'Tableau de bord',
    href: '/',
    icon: {
      clicked: '/dashboardicon.svg',
      default: '/defaultdashboardicon.svg',
    },
  },
  {
    label: 'Mes résultats',
    href: '/results',
    icon: {
      clicked: '/bulletinsicon.svg',
      default: '/defaultbulletinsicon.svg',
    },
  },
  {
    label: 'Calendrier',
    href: '/calendrier',
    icon: {
      clicked: '/calendriericon.svg',
      default: '/defaultcalendriericon.svg',
    },
  },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={cn(
        'w-full h-full border-r shadow-sm flex flex-col',
        isOpen ? 'bg-mainGreen' : 'bg-silver'
      )}
    >
      <div className={cn('p-4 border-none', isOpen && 'bg-
