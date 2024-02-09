import { Skeleton } from '@/components/ui/skeleton';
import ClasseCard from './classe-card';
import { AjouterUneClasse } from '@/components/modals/ajouter-une-classe';

const ClasseCardContainer = ({
  data,
  isPending,
  user_id,
  estab,
}: {
  data: any;
  isPending: boolean;
  user_id: string;
  estab: number;
}) => {
  const CLassData = data;
  console.log(CLassData);
  return (
    <div className="flex flex-wrap gap-[36px] justify-between">
      {/* Pas de classes ajoutées pour le moment. */}
      {CLassData?.length === 0 ? (
        <div className="w-[440px] p-5">
          <span className="text-[#727272] text-[19px] font-normal  leading-[33.34px]">
            Pas de classes ajoutés pour le moment.
          </span>
          <AjouterUneClasse user_id={user_id} estab={estab}>
            <span className=" cursor-pointer text-[#1B8392] text-[19px] font-medium  leading-[33.34px]">
              Ajoutez
            </span>
          </AjouterUneClasse>
          <span className="text-[#727272] text-[19px] font-normal  leading-[33.34px]">
            {' '}
            vos classes maintenant.
          </span>
        </div>
      ) : isPending ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-[333px] h-[190px] rounded-2xl" />
        ))
      ) : (
        CLassData?.map((item: any) => {
          return <ClasseCard key={item.id} data={item} />;
        })
      )}
    </div>
  );
};

export default ClasseCardContainer;
