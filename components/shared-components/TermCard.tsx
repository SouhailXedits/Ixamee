import NoResultsFount from './NoResultsFount';
import UserExam from './UserExam';

function TermCard({ term }: any) {
  console.log(term)
  return (
    <div className=" flex flex-col gap-5  min-w-fit min-h-[15rem] h-full ">
      <div className=" bg-4/50 p-2 rounded text-mainGreen font-semibold">{term.name}</div>
      <div className=" min-w-fit min-h-[15rem] h-full flex flex-col gap-6 shadow-lg rounded-xl p-4 hover:scale-105 transition-all">
        <div className=" flex flex-col gap-4">
          {term.exams.length === 0 && <NoResultsFount />}
          {term.exams?.map((exam: any) => (
            <UserExam key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermCard;
