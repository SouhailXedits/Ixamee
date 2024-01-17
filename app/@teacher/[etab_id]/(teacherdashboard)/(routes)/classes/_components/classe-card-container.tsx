import ClasseCard from './classe-card';

const ClasseCardContainer = ({ data }: { data: any }) => {
  const CLassData = data?.data;
  const items = [
    { id: 1, className: 'Bac Sciences_3', NumberOfStudent: 36 },
    { id: 2, className: '2ème Sciences_2', NumberOfStudent: 10 },
    { id: 3, className: '3ème Maths_4', NumberOfStudent: 12 },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {/* Pas de classes ajoutées pour le moment. */}

      {/* <div className="w-[438px] p-5">
      <span className="text-[#727272] text-[19px] font-normal  leading-[33.34px]">Pas de classes ajoutés pour le moment.</span><span className=" cursor-pointer text-[#1B8392] text-[19px] font-medium  leading-[33.34px]">Ajoutez</span><span className="text-[#727272] text-[19px] font-normal  leading-[33.34px]"> vos classes maintenant.</span></div> */}
      {CLassData?.map((item :any) => {
        return <ClasseCard key={item.id} data={item} />;
      })}
    </div>
  );
};

export default ClasseCardContainer;
