import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const examCorrectionData = [
  {
    id: 1,
    name: 'Maher Laarif',
    avatarSrc: '/userAvatar/user1.svg',
    status: {
      color: '#F69D16',
      bgColor: '#FFF4D3',
      text: 'En cours',
    },
    percentage: {
      color: '#F69D16',
      value: '25%',
    },
  },
  {
    id: 2,
    name: 'Lina Laadhari',
    avatarSrc: '/userAvatar/user2.svg',
    status: {
      color: '#12B76A',
      bgColor: '#D1FADF',
      text: 'En cours',
    },
    percentage: {
      color: '#12B76A',
      value: '100%',
    },
  },
  {
    id: 3,
    name: 'Jawher Souguir',
    avatarSrc: '/userAvatar/user3.svg',
    status: {
      color: '#F04438',
      bgColor: '#FEE4E2',
      text: 'Non corrigé',
    },
    percentage: {
      color: '#F04438',
      value: '0%',
    },
  },
  {
    id: 4,
    name: 'Jawher Souguir',
    avatarSrc: '/userAvatar/user3.svg',
    status: {
      color: '#F04438',
      bgColor: '#FEE4E2',
      text: 'Non corrigé',
    },
    percentage: {
      color: '#F04438',
      value: '0%',
    },
  },
];

const AvatarTableCell = ({ item }: { item: any }) => {
  return (
    <TableCell className="flex items-center justify-start gap-4 text-lg font-medium">
      <div className="w-[65px] h-[65px] p-2 ">
        <div
          className={`flex items-center justify-center border-2 w-[60px] h-[60px] rounded-full border-dashed   `}
          style={{ borderColor: item.status.color }}
        >
          <Image
            src={item.avatarSrc}
            alt={`${item.name}'s avatar`}
            width={50}
            height={50}
            className="rounded-full "
          />
        </div>
      </div>
      <div className="text-[#102528] text-xs font-medium  leading-[25px]">
        {item.name}
      </div>
    </TableCell>
  );
};

const StatusTableCell = ({ item }: { item: any }) => {
  return (
    <TableCell>
      <div
        className={`w-28 h-[25px]  rounded-2xl flex items-center justify-center gap-[5px]`}
        style={{ backgroundColor: item.status.bgColor }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full`}
          style={{ backgroundColor: item.status.color }}
        />
        <div
          className={` text-xs font-normal leading-[18px]`}
          style={{ color: item.status.color }}
        >
          {item.status.text}
        </div>
      </div>
    </TableCell>
  );
};

const PercentageTableCell = ({ item }: { item: any }) => {
  return (
    <TableCell>
      <div className="w-[114px] text-center flex items-center">
        <span
          className={` text-xl font-semibold  uppercase leading-normal`}
          style={{ color: item.percentage.color }}
        >
          {item.percentage.value}
        </span>
        <span
          className={` text-base font-normal capitalize`}
          style={{ color: item.percentage.color }}
        >
          corrigé
        </span>
      </div>
    </TableCell>
  );
};

const ExamCorrectionList = () => {
  return (
    <div className="p-3">
      <Table>
        <TableBody>
          {examCorrectionData.map((item) => (
            <TableRow key={item.id} className="w-full">
              <AvatarTableCell item={item} />
              <StatusTableCell item={item} />
              <PercentageTableCell item={item} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamCorrectionList;
