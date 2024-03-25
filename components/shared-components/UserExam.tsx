'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import TelachargePdfEvaluation from './TelachargePdfEvaluation';

function UserExam({ exam, examsData }: any) {
  const params = useParams();
  const user_id = exam?.user?.id;

  const userContent = exam?.examCorrection?.filter((item: any) => {
    return item.user_id === user_id;
  });

  const examContent = exam?.examContent;

  const pathname = usePathname();

  const router = useRouter();

  function handleRedirect() {
    if (params.student_id)
      router.push(
        `/${params.etab_id}/classes/${params.classe_id}/student/${params.student_id}/correction/${exam.exam_id}`
      );
    else router.push(`${pathname}/correction/${exam.exam_id}`);
    // else router.push(`/${params.etab_id}/results/${params.classe_id}/correction/${exam.exam_id}`);
  }
  function handelUplodFicher() {
    console.log('dskdskdk');
  }
  console.log(exam?.progress);
  const progress = exam?.progress ;
  //1/acelsss / 16 / students / cls33eyik000040q9bm7811vv / correction / 64;

  return (
    <div className="flex items-center justify-between p-2 border-l-2 rounded border-orangeColor/80 gap-14">
      <div className=" basis-[50%]">
        <p className="text-xl font-medium whitespace-nowrap text-black/80">{exam?.name}</p>
        <p className=" text-black/50">Ajouté le: {exam?.date}</p>
      </div>
      <div className="flex flex-col items-center gap-1 text-mainGreen">
        {exam?.status === 'done' && (
          <p>
            {exam?.marksObtained}/{exam?.totalScore}
          </p>
        )}

        {
          <p>
            {exam?.progress ? (
              <p className={` ${progress >= 0 ? 'text-[#12B76A]' : 'text-[#F04438]'} flex gap-1 items-center`}>
                {progress >= 0 ? (
                  <Image src="/progress-up.svg" alt="arrow icon" height={16} width={16} />
                ) : (
                  <Image src="/progress-down.svg" alt="arrow icon" height={16} width={16} />
                )}
                <span className=' flex justify-center'>{progress + '%'}{' '}</span>
              </p>
            ) : (
              '--'
            )}
          </p>
        }

        {/* <p>--</p> */}
      </div>
      <div className="flex flex-col items-center gap-1 opacity-50 text-mainGreen">
        <p>rang </p>
        {exam?.status === 'done' ? <p>{exam?.range}</p> : <p>--</p>}
      </div>
      <div className="flex flex-col items-center justify-center gap-0">
        {!params.student_id ? (
          <Button
            onClick={handleRedirect}
            name="bnt"
            className="flex text-xs  underline items-center gap-2  text-[#1B8392] bg-transparent "
          >
            Examen <Image src="/expand-icon-white.svg" alt="expand icon" height={16} width={16} />
          </Button>
        ) : (
          <Button
            onClick={handleRedirect}
            name="bnt"
            className="flex items-center gap-2 text-xs text-white bg-transparent bg-2 h-[35px] hover:scale-105 duration-300 "
          >
            Examen <Image src="/vector.svg" alt="expand icon" height={12} width={12} />
          </Button>
        )}

        {!params.student_id && (
          <TelachargePdfEvaluation
            userContent={userContent}
            user_id={user_id}
            userDetails={examContent}
          ></TelachargePdfEvaluation>
        )}
      </div>
    </div>
  );
}

export default UserExam;
