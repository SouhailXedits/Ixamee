import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const examCorrectionData = [
  {
    id: 1,
    name: 'Maher Laarif',
    avatarSrc: '/userAvatar/user1.svg',
    statusColor: '#F69D16',
    bgstatusColor: '#FFF4D3',
    statusText: 'En cours',
    percentageColor: '#F69D16',
    percentage: '25%',
  },
  {
    id: 2,
    name: 'Lina Laadhari',
    avatarSrc: '/userAvatar/user2.svg',
    statusColor: '#12B76A',
    bgstatusColor: '#D1FADF',
    statusText: 'En cours',
    percentageColor: '#12B76A',
    percentage: '100%',
  },
  {
    id: 3,
    name: 'Jawher Souguir',
    avatarSrc: '/userAvatar/user3.svg',
    statusColor: '#F04438',
    bgstatusColor: '#FEE4E2',
    statusText: 'Non corrigé',
    percentageColor: '#F04438',
    percentage: '0%',
  },
];

const ExamCorrectionList = () => {
  return (
    <div className="p-3">
      <Table>
        <TableBody>
          {examCorrectionData.map((item :any) => (
            <TableRow key={item.id} className="w-full">
              <TableCell className="flex items-center justify-start gap-4 text-lg font-medium">
                <div className="w-[65px] h-[65px] p-2 ">
                  <div
                    className={`flex items-center justify-center border-2 w-[60px] h-[60px] rounded-full border-dashed   `}
                    style={{ borderColor: item.statusColor }}
                  >
                    <Image
                      src={item.avatarSrc}
                      alt={`user${item.id}`}
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
              <TableCell>
                <div
                  className={`w-28 h-[25px]  rounded-2xl flex items-center justify-center gap-[5px]`}
                  style={{ backgroundColor: item.bgstatusColor }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full`}
                    style={{ backgroundColor: item.statusColor }}
                  />
                  <div
                    className={` text-xs font-normal leading-[18px]`}
                    style={{
                      color: item.statusColor,
                    }}
                  >
                    {item.statusText}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[114px] text-center flex items-center">
                  <span
                    className={` text-xl font-semibold  uppercase leading-normal`}
                    style={{
                      color: item.percentageColor,
                    }}
                  >
                    {item.percentage}
                  </span>
                  <span
                    className={` text-base font-normal capitalize`}
                    style={{
                      color: item.percentageColor,
                    }}
                  >
                    corrigé
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamCorrectionList;
