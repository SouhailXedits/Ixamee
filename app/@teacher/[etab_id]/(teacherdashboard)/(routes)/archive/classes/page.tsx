'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedClasses } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';


function ClassesLayout() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const params = useParams()
  const estabId = params.etab_id

  const filters = queryClient.getQueryData(['a-classes-filters']);
  console.log(filters)

  
  
  
  const {
    data: classes,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['archived_classes', 1, filters],
    queryFn: async () => await getAllArchivedClasses(user.id, +estabId, filters),
  });


  if (isPending)
    return (
      <div className=" flex gap-3">
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
      </div>
    );
  const data = classes?.data || [];
  console.log(data);
  const reformedData = data.map((classe:any) => {
    return {
      id: classe.id,
      name: classe.name,
      archived_at: classe.archived_at,
      number_students: classe.student_class.length,
    };
  });
  console.log(reformedData);
  if (reformedData.length === 0) return (
    <p>Pas de classes archivés pour le moment.<br/>N’oubliez pas d’archiver les classes non actifs.</p>
  );

  return (
    <div className=" flex gap-7 flex-wrap">
      {reformedData.map((classe: any) => (
        <ArchiverCard data={classe} key={classe.id} />
      ))}
    </div>
  );
}

export default ClassesLayout;
