'use client';

import { useCreateEstab } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/hooks/useCreateEstab';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

function EstabName() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { etab_id } = params;
  const userEstab = queryClient.getQueryData(['teacherEstab']) as any;

  // const currentEstab = userEtabs?.find((res :any) => +res?.id === +etab_id);
  //

  return (
    <div
      style={{
        alignSelf: 'stretch',
        color: 'var(--x-1)',
        fontFamily: '"Poppins", Helvetica',
        fontSize: '11px',
        fontWeight: '400',
        letterSpacing: '0',
        lineHeight: '18px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {userEstab.name}
      {/* {meta.estab} */}
      {/* Lycée Privé Élite Nabeul */}
    </div>
  );
}

export default EstabName;
