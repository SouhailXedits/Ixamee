import Image from 'next/image';

const NavbarProfile = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Image
          alt="picture Student"
          src="/studenttestpicture.svg"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-start ">
        <span className="w-[120px] text-[#1B8392] text-sm font-semibold ">Firas Latrach </span>
        <span className="w-[120px] text-[#99C6D3] text-xs font-thin ">Professeur</span>
      </div>

      <div>
        <Image
          alt="arrowDOwn"
          src="/arrowdown.svg"
          width={14}
          height={14}
          className="cursor-pointer "
        />
      </div>
    </div>
  );
};

export default NavbarProfile;
