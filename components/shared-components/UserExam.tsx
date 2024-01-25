import { Button } from "@/components/ui/button";
import Image from "next/image";

function UserExam({exam}: any) {
    console.log(exam)
    return (
      <div className="border-l-2 border-orangeColor/80 flex gap-14 p-2 rounded justify-between">
        <div className=" basis-[50%]">
          <p className=" text-xl whitespace-nowrap text-black/80 font-medium ">{exam.name}</p>
          <p className=" text-black/50">Ajouté le: {exam.date}</p>
        </div>
        <div className=" flex items-center flex-col gap-1 text-mainGreen">
          <p>
            {exam.marksObtained}/{exam.totalScore}
          </p>
          <p>--</p>
        </div>
        <div className=" flex items-center flex-col gap-1 opacity-50 text-mainGreen">
          <p>rang </p>
          <p>{exam.rang}</p>
        </div>
        <div>
          <Button className=" bg-mainGreen p-7 py-1 flex gap-2 items-center">
            Examen <Image src="/expand-icon-white.svg" alt="expand icon" height={20} width={20} />
          </Button>
        </div>
      </div>
    );
}

export default UserExam
