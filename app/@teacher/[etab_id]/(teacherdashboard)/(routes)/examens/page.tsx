import { getAllExam } from '@/actions/examens';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';

export default async function Examens() {
  // const data = await db.user.findUnique({
  //   where: {
  //     id: 'clr9c0dq4000442qrnl18g9r3',
  //   },
  // });
  // console.log(data);
  const data = await getUserByEmail('mohamed.amine.slimani@horizon-tech.tn');
  console.log(data);
  return (
    <div className="flex flex-col gap-6 p-10">
      <Heading />
      <ExamCardsLayout />
    </div>
  );
}
