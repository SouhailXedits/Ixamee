'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { teacherAminOutput } from '@/types/users/teacher';

import Image from 'next/image';
import { useState } from 'react';

interface editEstabProps {
  children: React.ReactNode;
  currentUser: teacherAminOutput;
}
export const TeachersInfos = ({ children, currentUser }: editEstabProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  function returnToCreate() {
    setIsFirstModalOpen(!isFirstModalOpen);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <div className="flex items-center gap-4 ">
            <div>
              <Image
                src={currentUser.image || '/defaultUserAvatr.svg'}
                alt=" user infos "
                width={42}
                height={42}
                className="rounded-full"
              />
            </div>
            <div className=" text-black/60">
              <p className="text-lg ">{currentUser.name}</p>
              <p>{currentUser.email}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2 p-3">
            <p className=" gap-2 text-[#959595] text-sm flex">
              <span className=" text-mainGreen"> Établissement(s):</span>
              <div>
                {currentUser?.user_establishment?.map((estab: any) => (
                  <p key={estab.id}>{estab.name}</p>
                ))}
              </div>
            </p>
            <p className=" gap-2 text-[#959595] text-sm flex items-center">
              <span className=" text-mainGreen"> Matière:(s):</span>
              <div>
                {currentUser.subjects.map((subject: any) => (
                  <p className="px-2 border rounded-full " key={subject.id}>
                    {subject?.name}
                  </p>
                ))}
              </div>
            </p>
            <p className=" gap-2 text-[#959595] text-sm flex items-center mt-2">
              <span className=" text-mainGreen"> Inscrit depuis :</span>{' '}
              {new Date(currentUser.emailVerified).toLocaleDateString('fr-FR')}
            </p>
            {/* <Label className="text-[#959595]">
              Nom : <span className="text-red">*</span>
            </Label>
            <Input
              type="text"
              defaultValue={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrer le nom de l'établissement"
              className="placeholder:text-[#727272]"
            /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
