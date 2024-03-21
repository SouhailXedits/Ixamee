import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/selectModifierStudent';
import Image from 'next/image';
import React, { useState } from 'react';

type StudentDetailsProps = {
  student: {
    image?: string;
    name?: string;
    email?: string;
    classe?: { id: string; name: string }[];
  };
  classe: {
    exam_classe?: {
      id: string;
      name: string;
    }[];
  };
};

export default function StudentDetails({ student, classe }: StudentDetailsProps) {
  if (!student) {
    return <div>Error: student is undefined</div>;
  }

  if (!classe) {
    return <div>Error: classe is undefined</div>;
  }

  const [name, setName] = useState(student.name || '');
  const [email, setEmail] = useState(student.email || '');
  const [defaultClass, setDefaultClass] = useState(
    student?.classe?.map((classe: any) => classe?.id)
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultClass(event.target.value);
  };

  return (
    <div className="flex w-full h-full gap-10 p-3 ">
      <div className="w-[63%] h-[63vh] p-5 flex flex-col gap-6  rounded-xl shadow-lg ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {student?.image ? (
              <Image
                src={student?.image}
                alt="student image"
                width={100}
                height={100}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <Image
                src={'/uplodImage.svg'}
                alt="upload image"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            )}

            <div className="flex flex-col gap-3">
              <span className="text-[#727272]">Ajouter une photo de profil</span>
              <span className="text-[#F04438]">Taille maximale est de 2 Mo</span>
            </div>
          </div>
          <div>
            <Image
              src={'/editeIcon.svg'}
              alt="edit icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="text-[#1B8392] text-lg">Informations personnelles</div>
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div>
              <span className="text-[#727272] pl-3">Nom et prénom</span>
              <Input
                // placeholder="FirasLatrach"
                defaultValue={name}
                className="border-none w-full placeholder:text-[#727272] text-[#727272]"
                onChange={handleNameChange}
              />
            </div>
            <div>
              <Image
                src={'/editeIcon.svg'}
                alt="edit icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6
