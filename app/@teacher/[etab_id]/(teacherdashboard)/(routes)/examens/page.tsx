import { getUserByEmail } from '@/data/user';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';

export default async function Examens() {
  const data =await getUserByEmail('mohamed.amine.slimani@horizon-tech.tn')
  console.log("🚀 ~ Examens ~ data:", data)
  return (
    <div className="flex flex-col gap-6 p-10">
      <Heading />
      <ExamCardsLayout />
    </div>
  );
}
