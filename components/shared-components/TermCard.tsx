import NoResultsFount from './NoResultsFount';
import UserExam from './UserExam';

function TermCard({ term, examsData }: any) {
  return (
    <div className=" flex flex-col gap-5  min-w-fit min-h-[15rem] h-full ">
      <div className="p-2 font-semibold rounded bg-4/50 text-mainGreen">{term.name}</div>
      <div className=" min-w-fit min-h-[15rem] h-full flex flex-col gap-6 shadow-lg rounded-xl p-4 hover:scale-105 transition-all">
        <div className="flex flex-col gap-4 ">
          {term?.exams.length === 0 && <NoResultsFount />}
          {term?.exams?.map((exam: any) => (
            <UserExam key={exam.id} exam={exam} examsData={examsData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermCard;
