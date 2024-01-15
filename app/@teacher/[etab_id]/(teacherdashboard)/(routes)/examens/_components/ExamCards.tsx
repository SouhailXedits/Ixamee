// Importing specific components and hooks separately
// 🚀 Next.js Navigation
import { useRouter } from 'next/navigation';
// 🖼️ Next.js Image component
import Image from 'next/image';
// 🔄 Reusable Progress component
import { Progress } from '@/components/ui/progress';
// 📦 DropdownMenuItemSelect component from modals
import { DropdownMenuItemSelect } from '@/components/modals/dropDownExameCard';

// Interface for the nested class data in ExamClassess
interface ExamClass {
  classe_id: string;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
  // Nested class details
  class: {
    id: string;
    name: string;
    range: string;
    establishment_id: number;
    teacher_id: string;
    is_archived: boolean;
  };
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
  examEstablishment: Record<string, any>; // Change to the appropriate type
  ExamClassess: ExamClass[];
}

// React component for displaying exam cards
const ExamCards = ({ exam }: { exam: Exam }) => {
  const router = useRouter();
  // Click handler to navigate to the exam details page
  const onClick = (exam_id: number) => {
    router.push(`/1/examens/${exam_id}`);
  };

  return (
    /* Container div for the exam card */
    <div
      className="w-[333px] h-[190px] bg-[#F3F6F6] p-3 rounded-3xl flex flex-col gap-2"
      onClick={() => onClick(exam?.id)}
    >
      {/* Header section with exam name and dropdown menu */}
      <div className="flex justify-between" onClick={(e) => e.stopPropagation()}>
        <span className="text-[#514E4E]">{exam?.name}</span>
        {/* Dropdown menu for additional options */}
        <DropdownMenuItemSelect>
          <Image
            src="/icons/kebab-menu.svg"
            alt="icons"
            width={20}
            height={20}
            onClick={(e) => e.preventDefault()}
          />
        </DropdownMenuItemSelect>
      </div>

      {/* Date information */}
      <div className="w-[293px] text-[#D2D1D1] text-sm font-normal leading-snug text-lg">
        Créé le: 12/12/22
      </div>

      {/* Displaying classes associated with the exam */}
      <div className="flex items-start justify-between w-full">
        <div className="mt-[20px] space-x-2">
          {/* Mapping over examClassess to display class names */}
          {exam?.ExamClassess.map((examClass, index) => (
            <div
              key={index}
              className="max-w-[65px] w-auto h-7 px-1.5 rounded-[100px] border border-[#1B8392] inline-flex truncate"
            >
              {/* Displaying individual class name */}
              <div className="flex gap-[2px] items-center justify-start grow shrink basis-0 text-xs font-medium leading-snug whitespace-nowrap text-[#1B8392]">
                <span>{examClass?.class?.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Exam correction progress */}
        <div
          className="flex h-[47px] inline-flex mt-[18px] bg-[#1B8392] rounded-xl items-end w-full justify-start flex-col items-center text-[#FFFFFF]"
          style={{ width: '54px' }}
        >
          <span className="text-ms">0% </span>
          <span className="text-xs">Corrigé</span>
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={20} className="w-[100%] h-2 bg-white mt-3" />
    </div>
  );
};

export default ExamCards;
