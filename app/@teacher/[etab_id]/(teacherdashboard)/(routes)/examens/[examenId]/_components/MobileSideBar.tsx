import Image from 'next/image';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '../../../../_components/sidebar';
export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition md:hidden hover:opacity-75">
        <div className="h-[58px] flex items-center justify-start pl-[14px]">
          <Image
            height={20}
            width={20}
            alt="menu"
            src="/burrgermenuicon.svg"
            className="cursor-pointer"
            // onClick={() => onCollapse()}
          />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar isOpen={false} />
      </SheetContent>
    </Sheet>
  );
}
