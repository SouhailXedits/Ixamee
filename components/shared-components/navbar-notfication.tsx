import Image from 'next/image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const NavbarNotification = () => {
  const notifications = [
    {
      id: 1,
      message: 'Nouha Khlif a accepté votre invitation.',
    },
    {
      id: 2,
      message: 'Maher Laadheri a accepté votre invitation.',
    },
    {
      id: 3,
      message: 'Nouha Khlif a accepté votre invitation.',
    },
  ];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative flex">
          <Image
            src="/navbarnotification.svg"
            alt="notification"
            width={37}
            height={37}
            className="cursor-pointer"
          />
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-[15px] h-[15px] p-2.5 bg-[#FEE4E2] rounded-[53px] justify-center items-center gap-2.5 inline-flex">
              <div className="animate-ping text-center text-[#F04438] text-[10px] font-bold font-mono ">{notifications.length}</div>
            </div>
          )}
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-90">
        <div className="flex flex-col justify-between w-full gap-3 ">
          <div className=" text-[#1B8392] text-xl font-medium  border-b border-[#1B8392] pb-2">
            Notifications
          </div>

          {notifications.length === 0 && (
            <div className="w-full text-start text-[#959595]   pt-6 font-thin ">
              Vous n’avez aucune nouvelle notification.
            </div>
          )}

          {notifications.length > 0 && (
            <div className="w-full text-start text-[#959595]    font-thin   cursor-pointer duration-300 flex flex-col gap-2  overflow-auto max-h-[170px] ">
              {notifications.map((notification) => (
                <span key={notification.id} className="p-2 rounded-lg hover:bg-secondeColor ">
                  {notification.message}
                </span>
              ))}
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default NavbarNotification;
