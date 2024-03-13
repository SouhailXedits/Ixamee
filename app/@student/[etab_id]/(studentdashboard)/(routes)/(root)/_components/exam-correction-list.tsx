import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const ExamCorrectionList = ({ data }: any) => {
  const correctionsData = data?.data;
  return (
    <div className="p-3">
      <Table>
        <TableBody>
          {correctionsData?.map((correction: any) => (
            <TableRow key={correction.id} className="w-full flex items-center justify-between">
              <TableCell className="flex items-center justify-start gap-3 text-lg font-medium">
                <div className="w-[65px] h-[65px] p-2 ">
                  <div
                    className={`flex items-center justify-center border-2 w-[60px] h-[60px] rounded-full border-dashed   `}
                  >
                    <Image
                      src={correction.exam.subject.icon}
                      alt="subject icon"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="text-[#102528] text-xs font-medium leading-[25px] ">
                  <p className=" text-lg font-semibold truncate">
                    {correction.exam?.subject?.name}
                  </p>
                  <p className="truncate">By {correction.exam?.teacher?.[0]?.name}</p>
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-start gap-3 truncate">
                {correction.exam?.name}
              </TableCell>
              <TableCell className="flex items-center justify-start gap-3 font-medium truncate">
                {correction.mark_obtained} / {correction.exam?.total_mark}
              </TableCell>
              <TableCell className="break-keep text-2 truncate">Rang : {correction.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamCorrectionList;
