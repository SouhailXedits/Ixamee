
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';

export default function Examens() {
  return (
    <div className="flex flex-col gap-6 p-10">
      <Heading/>
      <ExamCardsLayout/>
    </div>
  );
}
