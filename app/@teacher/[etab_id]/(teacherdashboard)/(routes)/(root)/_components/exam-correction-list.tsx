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

const ExamCorrectionList = (data: any) => {
  const getColor = (status: string) => {
    if (status === 'done') return '#12B76A';
    if (status === 'pending') return '#F69D16';
    if (status === 'notCorrected') return '#F04438';
    if (status === 'notClassified') return '#F04438';
    if (status === 'absent') return '#727272';
  };
  const getBgColor = (status: string) => {
    if (status === 'done') return '#D1FADF';
    if (status === 'pending') return '#FFF4D3';
    if (status === 'notCorrected') return '#FEE4E2';
    if (status === 'notClassified') return '#FEE4E2';
    if (status === 'absent') return '#E7E7E7';
  };
  const getStatusText = (status: string) => {
    if (status === 'done') return 'Corrigé';
    if (status === 'pending') return 'En cours';
    if (status === 'notCorrected') return 'Non corrigé';
    if (status === 'notClassified') return 'Non classé';
    if (status === 'absent') return 'Absent';
  };
  const DoteColor = (status: string) => {
    if (status === 'done') return '#12B76A';
    if (status === 'pending') return '#F69D16';
    if (status === 'notCorrected') return '#F04438';
    if (status === 'notClassified') return '#8862F5';
    if (status === 'absent') return '#727272';
  };
  const getPercentageText = (status: string) => {
    if (status === 'done') return '100%';
    if (status === 'pending') return '25%';
    if (status === 'notCorrected') return '0%';
    if (status === 'notClassified') return '0%';
    if (status === 'absent') return '0%';
  };

  if (!data) return null;
  return (
    <div className="p-3 max-h-[20rem]">
      <Table className="overflow-scroll ">
        <TableBody>
          {data?.data?.map((item: any) => (
            <TableRow key={item.id} className="w-full">
              <TableCell className="flex items-center justify-start gap-4 text-lg font-medium">
                <div className="w-[65px] h-[65px] p-2 ">
                  <div
                    className={`flex items-center justify-center border-2 w-[60px] h-[60px] rounded-full border-dashed   `}
                    style={{ borderColor: getColor(item.status) }}
                  >
                    {item?.image ? (
                      <Image
                        src={item?.image}
                        alt={`user${item?.id}`}
                        width={50}
                        height={50}
                        className="rounded-full  w-[50px] h-[50px] object-cover"
                      />
                    ) : (
                      <Image
                        src={'/defaultUserAvatr.svg'}
                        alt={`user${item?.id}`}
                        width={50}
                        height={50}
                        className="rounded-full "
                      />
                    )}
                  </div>
                </div>
                <div className="text-[#102528] text-xs font-medium  leading-[25px]">
                  {item?.name}
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`w-28 h-[25px]  rounded-2xl flex items-center justify-center gap-[5px]`}
                  style={{ backgroundColor: getBgColor(item.status) }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full`}
                    style={{ backgroundColor: DoteColor(item.status) }}
                  />
                  <div
                    className={` text-xs font-normal leading-[18px]`}
                    style={{
                      color: getColor(item.status),
                    }}
                  >
                    {getStatusText(item.status)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[114px] text-center flex items-center">
                  <span
                    className={` text-xl font-semibold  uppercase leading-normal`}
                    style={{
                      color: getColor(item.status),
                    }}
                  >
                    {getPercentageText(item.status)}
                  </span>
                  <span
                    className={` text-base font-normal capitalize`}
                    style={{
                      color: getColor(item.status),
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
