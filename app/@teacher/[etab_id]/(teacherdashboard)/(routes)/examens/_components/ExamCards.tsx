// Importing specific components and hooks separately
// 🚀 Next.js Navigation
import { usePathname, useRouter } from 'next/navigation';
// 🖼️ Next.js Image component
import Image from 'next/image';
// 🔄 Reusable Progress component
import { Progress } from '@/components/ui/progress';
// 📦 DropdownMenuItemSelect component from modals
import { DropdownMenuItemSelect } from '@/components/modals/dropDownExameCard';
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';

// Interface for the nested class data in ExamClassess
interface exam_classe {
  classe_id: string;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
  // Nested class details
  id: string;
  name: string;
  range: string;
  establishment_id: number;
  teacher_id: string;
  is_archived: boolean;
}

// Interface for the main Exam data
interface Exam {
  id: number;
  name: string;
  total_mark: number;
  coefficient: number;
  teacher_id: string;
  class_id: number;
  subject_id: number;
  term: string | null;
  progress: string;
  examEstablishment: Record<string, any>; // Change to the appropriate type
  exam_classess: exam_classe[];
  create_at: any;

  content: any;
}

// React component for displaying exam cards
const ExamCards = ({ exam }: { exam: Exam }) => {
  const router = useRouter();
  const pathname = usePathname();
  const onClick = (exam_id: number) => {
    router.push(`${pathname}/${exam_id}`);
  };

  const totalMark = exam.total_mark;
  const examContent = exam?.content === null ? [] : exam?.content;

  const CurrentMark = calcAllMark(examContent);

  const porsentage = (CurrentMark / totalMark) * 100;
  console.log(exam);
  return (
    /* Container div for the exam card */
    <div
      className=" min-w-[180px] h-[190px] bg-[#F3F6F6] p-3 rounded-3xl flex flex-col gap-2 cursor-pointer hover:shadow-md transition-all"
      onClick={() => onClick(exam?.id)}
    >
      {/* Header section with exam name and dropdown menu */}
      <div className="flex justify-between" onClick={(e) => e.stopPropagation()}>
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="text-[#514E4E]">
              {exam?.name.length > 10 ? exam?.name.slice(0, 10) + '...' : exam?.name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="max-w-[200px] bg-white p-2 rounded-lg text-pretty">
            <span className="text-[#727272]  break-words w-[200px]">{exam?.name}</span>
          </HoverCardContent>
        </HoverCard>
        {/* <span className="text-[#514E4E]">{exam?.name}</span> */}
        {/* Dropdown menu for additional options */}
        <DropdownMenuItemSelect exam={exam}>
          <Image
            src="/icons/kebab-menu.svg"
            alt="icons"
            width={20}
            height={20}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItemSelect>
      </div>

      {/* Date information */}
      <div className=" text-[#D2D1D1]  font-normal leading-snug text-lg">
        Créé le: {exam.create_at.toISOString().slice(0, 10)}
      </div>

      {/* Displaying classes associated with the exam */}
      <div className="flex items-center justify-between w-full mt-[20px]">
        <div className=" space-x-2">
          {/* Mapping over examClassess to display class names */}
          {exam?.exam_classess?.map((examClass, index) => (
            <div
              key={index}
              className="max-w-[65px] w-auto h-7 px-1.5 rounded-[100px] border border-[#1B8392] inline-flex truncate"
            >
              {/* Displaying individual class name */}
              <div className="flex gap-[2px] items-center justify-start grow shrink basis-0 text-xs font-medium leading-snug whitespace-nowrap text-[#1B8392]">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="">
                      {examClass?.name.length > 7
                        ? examClass?.name.slice(0, 7) + '...'
                        : examClass?.name}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-[200px] bg-white p-2 rounded-lg text-pretty">
                    <span className="text-[#727272]  break-words w-[200px] text-md">
                      {examClass?.name}
                    </span>
                  </HoverCardContent>
                </HoverCard>
                {/* <span>{examClass?.name}</span> */}
              </div>
            </div>
          ))}
        </div>

        {/* Exam correction progress */}
        <div className="flex bg-[#1B8392] p-1 items-center justify-center rounded-xl  ">
          <div className="  w-full justify-center flex-col  text-[#FFFFFF]">
            <span className="text-ms">{porsentage}% </span>
            {/* <span className="text-xs">Corrigé</span> */}
          </div>
        </div>
      </div>

      <Progress value={porsentage} className="w-full h-2 mt-5 bg-white" />
      {/* Progress bar */}
    </div>
  );
};

export default ExamCards;
