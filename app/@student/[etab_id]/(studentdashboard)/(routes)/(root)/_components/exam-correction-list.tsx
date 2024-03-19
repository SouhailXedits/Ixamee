import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const ExamCorrectionList = ({ data }: any) => {
  const correctionsData = data;
  const marks =
    correctionsData &&
    correctionsData?.map((item: any) => {
      const percentage = (item.mark_obtained / item.exam.total_mark) * 100;
      const color = percentage >= 50 ? '#D1FADF' : '#FEE4E2';
      const textColor = percentage >= 50 ? '#12B76A' : '#F04438';
      const formattedMark = item.mark_obtained.toFixed(2);

      return {
        mark_obtained: formattedMark,
        total_mark: item.exam.total_mark,
        color: color,
        textColor: textColor,
      };
    });
  // style={
  //   Examdata.mark_obtained > Examdata.exam.total_mark / 2
  //     ? { color: '#12B76A', backgroundColor: '#12b76a40' }
  //     : Examdata.mark_obtained > 10 &&
  //       Examdata.mark_obtained < (Examdata.exam.total_mark * 75) / 100
  //     ? { color: '#F69D16' }
  //     : { color: '#F04438' }
  // }

  return (
    <div className="p-3">
      <Table>
        <TableBody>
          {correctionsData &&
            marks &&
            correctionsData?.map((correction: any, index: number) => (
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
                    <p className="truncate text-[#B3B3B3]">
                      By {correction.exam?.teacher?.[0]?.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-start gap-3 truncate">
                  {correction.exam?.name}
                </TableCell>
                <TableCell
                  className={`flex items-center justify-center gap-3 font-medium truncate  w-20 h-5 py-4 rounded-3xl text-[${marks[index].textColor}] bg-[${marks[index].color}]`}
                  style={
                    correction.mark_obtained > correction.exam.total_mark / 2
                      ? { color: '#12B76A', backgroundColor: '#12b76a40' }
                      : correction.mark_obtained > 10 &&
                        correction.mark_obtained < (correction.exam.total_mark * 75) / 100
                      ? { color: '#F69D16' }
                      : { color: '#F04438' }
                  }
                >
                  {marks[index].mark_obtained < 10
                    ? '0' + marks[index].mark_obtained
                    : marks[index].mark_obtained}
                  {''}/{correction.exam?.total_mark}
                </TableCell>
                <TableCell className="break-keep text-2 truncate">
                  Rang : {correction.rank}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamCorrectionList;
