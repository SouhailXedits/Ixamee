import ExamCards from './ExamCards';

function ExamCardsLayout() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <ExamCards />
      <ExamCards />
      <ExamCards />

      <ExamCards />
      <ExamCards />
    </div>
  );
}

export default ExamCardsLayout;
