// import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import ExamCorrectionRow from './ExamCorrectionRow';
import Rien from './Rien';

// const examCorrectionData = [
//   {
//     id: 1,
//     name: 'Maher Laarif',
//     avatarSrc: '/userAvatar/user1.svg',
//     statusColor: '#F69D16',
//     bgstatusColor: '#FFF4D3',
//     statusText: 'En cours',
//     percentageColor: '#F69D16',
//     percentage: '25%',
//   },
//   {
//     id: 2,
//     name: 'Lina Laadhari',
//     avatarSrc: '/userAvatar/user2.svg',
//     statusColor: '#12B76A',
//     bgstatusColor: '#D1FADF',
//     statusText: 'En cours',
//     percentageColor: '#12B76A',
//     percentage: '100%',
//   },
//   {
//     id: 3,
//     name: 'Jawher Souguir',
//     avatarSrc: '/userAvatar/user3.svg',
//     statusColor: '#F04438',
//     bgstatusColor: '#FEE4E2',
//     statusText: 'Non corrigé',
//     percentageColor: '#F04438',
//     percentage: '0%',
//   },
//   {
//     id: 4,
//     name: 'Jawher Souguir',
//     avatarSrc: '/userAvatar/user3.svg',
//     statusColor: '#F04438',
//     bgstatusColor: '#FEE4E2',
//     statusText: 'Non corrigé',
//     percentageColor: '#F04438',
//     percentage: '0%',
//   },
// ];

const ExamCorrectionList = ({ data }: any) => {
  console.log(data);
  if (!data?.length) return <div className="flex items-center justify-center w-full h-full p-10 border rounded-xl">
    <Rien
      image="/dashboard/books.svg"
      className="flex flex-col justify-center gap-6"
      message="Pas de bulletins pour le moment"
    />
  </div>;
  return (
    <div className="flex flex-col gap-10 p-3">
      <div className="flex items-center gap-4 ">
        <Image src={data[0].exam?.subject.icon} alt="subject icon" width={50} height={50} />
        <div className=" text-2">
          <p className="text-xl font-semibold ">{data[0].exam?.subject.name}</p>
          <p>Coefficient : {data[0].exam?.subject.coefficient}</p>
        </div>
      </div>
      <div className=" overflow-auto max-h-[150px]">
        <div>
          {data.map((exam: any) => (
            // console.log(exam)
            <ExamCorrectionRow Examdata={exam} key={exam.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamCorrectionList;
