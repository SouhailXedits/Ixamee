'use client';
import Image from 'next/image';

const Profile = () => {
  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mon profil</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Mon profil</span>
          </div>
        </div>
      </nav>

      <div>
        forms
      </div>
    </main>
  );
};

export default Profile;
