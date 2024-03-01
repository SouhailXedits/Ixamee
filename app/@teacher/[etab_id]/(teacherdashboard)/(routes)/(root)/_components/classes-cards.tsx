import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
function translateDateFormat(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}
const ClassesCards = ({ classes, isPending, etabId }: any) => {
  return (
    <div className="grid w-full gap-4 2xl:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
      {isPending &&
        Array.from({ length: 4 }).map((_, index: any) => (
          <Skeleton key={index} className="w-[250px] h-[270px] rounded-xl pt-10" />
        ))}
      {classes &&
        classes.map((classe: any) => {
          return (
            <div
              key={classe}
              className="min-w-[260.50px] h-[271px] py-[15px] bg-[#F0F6F8] rounded-[20px] flex-col justify-center items-center gap-[38px] inline-fle p-5 hover:opacity-75 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    alt="MatierIcon"
                    src="dashboard/classe/mathIcon.svg"
                    width={29}
                    height={29}
                  />
                  {/* <span className="text-[#1B8392] text-lg font-semibold  leading-[25px]">
                    {classe.name}
                  </span> */}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="text-[#1B8392] text-lg font-semibold  leading-[25px]">
                        {classe?.name?.length > 20
                          ? classe?.name?.slice(0, 20) + '...'
                          : classe?.name}
                      </span>
                      {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-[#727272]  break-words w-[200px] text-md">
                      <span className="text-[#1B8392] text-xl font-semibold">{classe.name}</span>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="flex h-2/5 py-2  w-full items-center justify-center text-center font-semibold text-[#4C4C4D] -space-x-2 overflow-hidden">
                {classe.student_class.length ? (
                  classe.student_class
                    .slice(0, 3)
                    .map((student: any, index: number) => (
                      <Image
                        key={index}
                        src={student.image || 'userAvatar/user3.svg'}
                        alt="userAvatar"
                        width={40}
                        height={40}
                        className="inline-block rounded-full w-[40px] h-[40px] object-cover"
                      />
                    ))
                ) : (
                  <div className="items-center justify-center w-full py-2 text-sm text-center h-2/5 text-10 opacity-70">
                    Pas d’étudiants dans cette classe.{' '}
                    <span className="text-[#1B8392] cursor-pointer">Ajoutez</span> maintenant.
                  </div>
                )}
                {classe.student_class.length > 3 && (
                  <div className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center text-[#1B8392]">
                    <span className="flex items-center justify-center">
                      +{classe.student_class.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <div className="items-center justify-center pb-2 text-center text-10 opacity-70">
                Créé le {translateDateFormat(classe.createdAt)}
              </div>
              <div className="flex items-center justify-center w-full p-2">
                <Link
                  href={`${etabId}/classes/${classe.id}`}
                  key={classe.id}
                  className=" pl-3 pr-3 text-md font-[700] leading-tight text-center text-white"
                >
                  <div className=" bg-[#1B8392] w-24 p-3  text-white flex items-center justify-center rounded-lg font-extrabold text-[17px] hover:opacity-90 duration-150 cursor-pointer">
                    Ouvrir
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ClassesCards;
