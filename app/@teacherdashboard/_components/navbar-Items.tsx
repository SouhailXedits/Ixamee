import Image from "next/image";
import NavbarProfile from "./navbar-profile";
import NavbarNotfication from "./navbar-notfication";

const NavbarItems = () => {
  return (
    <div className="flex items-center gap-7">
      <NavbarNotfication/>

      <NavbarProfile/>


    </div>

  );
}
 
export default NavbarItems ;