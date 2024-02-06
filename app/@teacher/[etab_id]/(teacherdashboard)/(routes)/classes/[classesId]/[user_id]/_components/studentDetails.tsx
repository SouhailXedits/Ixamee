import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/selectModifierStudent';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useState } from 'react';

export default function StudentDetails({ student, classe }: any) {
  if (!student) return;
  if (!classe) return;
  const [name, setName] = useState(student?.name);
  const [email, setEmail] = useState(student?.email);
  const [defaultClass, setDefaultClass] = useState(
    student?.classe?.map((classe: any) => classe.id)
  );

  return (
    <div className="flex w-full h-full gap-10 p-3 ">
      <div className="w-[63%] h-[63vh] p-5 flex flex-col gap-6  rounded-xl shadow-lg ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {student?.image ? (
              <Image
                src={student?.image}
                alt="uplodImage"
                width={100}
                height={100}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <Image
                src={'/uplodImage.svg'}
                alt="uplodImage"
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
              alt="editeIcon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="text-[#1B8392] text-lg">Informations personnelles</div>
        <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
          <div>
            <span className="text-[#727272] pl-3">Nom et prénom</span>
            <Input
              // placeholder="FirasLatrach"
              defaultValue={name}
              className="border-none w-full placeholder:text-[#727272] text-[#727272]"
            />
          </div>
          <div>
            <Image
              src={'/editeIcon.svg'}
              alt="editeIcon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
          <div>
            <span className="text-[#727272] pl-3">E-mail</span>
            <Input
              defaultValue={email}
              className="border-none w-[400px] placeholder:text-[#727272] text-[#727272]"
            />
          </div>
          <div>
            <Image
              src={'/editeIcon.svg'}
              alt="editeIcon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
          <div className="w-[110%]">
            <span className="text-[#727272] pl-3">Classe</span>
            <Select>
              <SelectTrigger className="w-[102%] border-none text-[#727272]">
                <SelectValue defaultValue={defaultClass} />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="corrige" className="">
                  Corrigé
                </SelectItem>
                <SelectItem value="en-cours">En cours</SelectItem>
                <SelectItem value="non-corrigé">Non corrigé</SelectItem>
                <SelectItem value="non-classé">Non classé</SelectItem>
                <SelectItem value="absent">Absent</SelectItem> */}
                {student?.classe?.map((classe: any) => (
                  <SelectItem value={classe.id}>{classe.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end w-full cursor-pointer ">
          <div className="text-white bg-[#1B8392] w-[110px] flex items-end justify-end p-3 rounded-lg ">
            Enregistrer
          </div>
        </div>
      </div>
      {classe?.exam_classe?.length > 0 && (
        <div className="w-full shadow-lg h-[63vh] p-5 rounded-lg">
          <span className="text-[#1B8392] text-xl">Résultats</span>

          <div>
            <div className="w-full pl-2 border-l-4 rounded-lg border-[#D1FADF]">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-[#727272] font-bold">Devoir de cont rôle N°2</span>
                  <div className="bg-[#1B8392] flex items-center gap-3 p-2 pl-3  text-white  rounded-xl cursor-pointer hover:opacity-50 transition-all transition-300">
                    Voir examen
                    <Image src={'/openExamicon.svg'} alt="openExamicon" width={20} height={20} />
                  </div>
                </div>
                <span className="text-[#B5B5B5] text-[12px]">Ajouté le: 12/05/2019</span>
                <div className="flex gap-10">
                  <div>
                    <span className="text-[#727272]">Note totale</span>
                    <div className="flex items-center">
                      <Image
                        src={'/smallarrowdown.svg'}
                        alt="smallarrowdown"
                        width={20}
                        height={20}
                      />
                      <span className="text-[#F04438] text-sm">11.2%</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="text-[#727272] text-4xl">15</span>
                      <span className="text-[#B5B5B5]">/20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
