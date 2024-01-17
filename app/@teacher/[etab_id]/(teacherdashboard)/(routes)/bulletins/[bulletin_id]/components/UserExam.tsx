import { Button } from "@/components/ui/button";

function UserExam({exam}: any) {
    console.log(exam)
    return (
      <div className="border-l-2 border-orangeColor/80 flex gap-10 p-2 rounded">
        <div>
          <p className=" text-xl">{exam.name}</p>
          <p className=" text-black/50">Ajouté le: {exam.date}</p>
        </div>
        <div className=" flex items-center flex-col gap-1 text-mainGreen">
          <p >
            {exam.marksObtained}/{exam.totalScore}
          </p>
          <p>--</p>
        </div>
        <div className=" flex items-center flex-col gap-1 opacity-50 text-mainGreen">
          <p>rang </p>
          <p>{exam.rang}</p>
        </div>
        <div>
          <Button className=" bg-mainGreen p-1 py-1">Examen</Button>
        </div>
      </div>
    );
}

export default UserExam
