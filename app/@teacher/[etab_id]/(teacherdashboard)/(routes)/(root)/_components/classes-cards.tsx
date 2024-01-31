import Image from 'next/image';

const ClassesCards = ({ classes }: any) => {
  console.log('🚀 ~ ClassesCards ~ classes:', classes);
  return (
    <div className="flex gap-4 ">
      {classes &&
        classes.map((classe: any) => {
          console.log('🚀 ~ ClassesCards ~ classe:', classe);
          return (
            <div className="w-[260.50px] h-[271px] py-[15px] bg-[#F0F6F8] rounded-[20px] flex-col justify-center items-center gap-[38px] inline-fle p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    alt="MatierIcon"
                    src="dashboard/classe/mathIcon.svg"
                    width={29}
                    height={29}
                  />

                  <span className="text-[#1B8392] text-lg font-semibold  leading-[25px]">
                    {classe.name}
                  </span>
                </div>
                <Image
                  alt="kebabMenu"
                  src="dashboard/classe/kebab-menu.svg"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
              </div>
              
              <div className=" flex flex-col pt-10 pb-4 w-full items-center justify-center text-center text-10 opacity-70">
                Pas d’étudiants dans cette classe.
                <div className=" flex  pt-10 pb-6 w-full items-center justify-center text-center font-semibold text-[#4C4C4D] -space-x-2 overflow-hidden ">
                  <Image
                    src="userAvatar/user1.svg"
                    alt="userAvate"
                    width={40}
                    height={40}
                    className="inline-block  rounded-full "
                  />
                  <Image
                    src="userAvatar/user2.svg"
                    alt="userAvate"
                    width={40}
                    height={40}
                    className="inline-block rounded-full "
                  />
                  <div className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center text-[#1B8392]">
                    <span className="flex items-center justify-center">22</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#1B8392] cursor-pointer">Ajoutez</span> maintenant.
                </div>
              </div>
              <div className="items-center justify-center text-center text-10 opacity-70 pb-2">
                Créé le {classe}
              </div>
              <div className="p-2 flex justify-center items-center w-full">
                <span className=" bg-[#1B8392] w-24 p-3  text-white flex items-center justify-center rounded-lg font-extrabold text-[17px] hover:opacity-90 duration-150 cursor-pointer">
                  Ouvrir
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ClassesCards;
