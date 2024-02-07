import NavbarItems from './navbar-Items';

const Navbar = () => {
  return (
    <nav className="flex items-center fixed top-0 h-[60px] p-5 w-full boreder-b bg-[#F0F6F8]  justify-end z-10 ">
      <NavbarItems />
    </nav>
  );
};

export default Navbar;
