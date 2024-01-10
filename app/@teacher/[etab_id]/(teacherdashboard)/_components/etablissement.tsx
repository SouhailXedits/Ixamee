'use client';
import Image from 'next/image';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { EtablissementItem } from './etablissement-item';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
const Etablissement = () => {
  const { collapsed } = useSidebar((state) => state);
  const lyceDetails = [
    {
      lyceName: 'Lycée Bourguiba Sousse',
      subLyceName: 'LBS',

      isChecked: false,
    },
    {
      lyceName: 'Lycée Privé Élite Nabeul',
      subLyceName: 'LPÉN',
      isChecked: true,
    },
  ];
  return (
    <div className="border-t border-[#99C6D3]">
      <div className="flex items-center gap-3 p-4">
        <Image src="/bankicon.svg" alt="bankicon" width={18} height={18} />
        <span className={cn('text-[#99C6D3]', collapsed && 'hidden')}>Établissement</span>
      </div>

      <EtablissementItem data={lyceDetails} />
    </div>
  );
};

export default Etablissement;
