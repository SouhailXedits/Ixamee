import Image from 'next/image';
import NavbarProfile from './navbar-profile';


const NavbarItems = () => {
  return (
    <div className="flex items-center gap-7">
      {/* <NavbarNotification /> */}

      <NavbarProfile />
    </div>
  );
};

export default NavbarItems;
