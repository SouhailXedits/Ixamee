import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SubjectIcon {
  id: string;
  src: string;
  alt: string;
}

export interface SubjectIconProps {
  icon: SubjectIcon;
  onClick: () => void;
  isSelected: boolean;
}

function SubjectIcon({ icon, onClick, isSelected }: SubjectIconProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer p-1 rounded-full border border-white",
        isSelected && "border-gray"
      )}
    >
      <Image src={icon.src} alt={icon.alt} width={50} height={50} />
    </div>
  );
}

export default SubjectIcon;

// Usage example:
import React, { KeyboardEvent } from "react";
import SubjectIcon from "./SubjectIcon";

const icons: SubjectIconProps[] = [
  {
    id: "1",
    src: "/icon1.png",
    alt: "Icon 1",
    onClick: () => console.log("Icon 1 clicked"),
    isSelected: false,
  },
  {
    id: "2",
    src: "/icon2.png",
    alt: "Icon 2",
    onClick: () => console.log("Icon 2 clicked"),
    isSelected: true,
  },
];

const Map = () => (
  <div
