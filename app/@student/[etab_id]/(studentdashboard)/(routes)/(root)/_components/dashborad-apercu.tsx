'use client';
import Image from 'next/image';
import ApercuItem from './apercu-Item';
import { useQueryClient } from '@tanstack/react-query';

const DashboradApercu = ({
  subjectCount,
  examCount,
  marksheetCount,
}: {
  subjectCount: any | undefined;
  examCount: number | undefined;
  marksheetCount: number | undefined;
}) => {
  const items = [
    {
      itemName: 'Mes matières',
      itemColor: '#FFF4F3',
      itemIcon: 'dashboard/apercu/classesicon.svg',
      itemStat: '-',
      count: subjectCount || 0,
      // isPending: classeCountPending,
      textColor: '#F04438',
    },
    {
      itemName: 'Mes bulletins',
      itemColor: '#F0F6F8',
      itemIcon: 'dashboard/apercu/file.svg',
      itemStat: '-',
      count: marksheetCount || 0,
      // isPending: false,
      textColor: '#1B8392',
    },
    {
      itemName: 'Mes examens',
      itemColor: '#FFF4D3',
      itemIcon: 'dashboard/apercu/orangeExam.svg',
      itemStat: '-',
      count: examCount || 0,
      // isPending: examCountPending,
      textColor: '#F69D16',
    },
  ];
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex gap-3">
        <Image alt="apercu" src="dashboard/apercu.svg" width={20} height={20} />
        <span className="text-xl font-[500] text-11">Aperçu</span>
      </div>

      <div className="flex gap-2 max-2xl:flex-wrap">
        {items.map((item) => (
          <ApercuItem
            key={item.itemColor}
            color={item.itemColor}
            icon={item.itemIcon}
            stat={item.itemStat}
            name={item.itemName}
            count={item.count}
            isPending={false}
            textColor={item.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboradApercu;
