import { cn } from "@/lib/utils";
import Image from "next/image"


export interface subjectIcon {
  id: string;
  src: string;
  alt: string;
}

export interface SubjectIconProps {
  icon: subjectIcon;
  onClick: () => void;
  isSelected: boolean;
}

function SubjectIcon({ icon, onClick, isSelected }: SubjectIconProps) {
  // console.log(icon);
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer p-1 rounded-full border border-white',
        isSelected && ' border-gray'
      )}
    >
      <Image src={icon.src} alt={icon.alt} width={50} height={50} />
    </div>
  );
}

export default SubjectIcon
