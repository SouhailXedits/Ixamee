'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getCorigeExameContent } from '@/actions/classe';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import Image from 'next/image';
import { Label } from '../ui/label';
import toast from 'react-hot-toast';

interface CorrectExamProps {
  children: React.ReactNode;
  data: any;
}

export const CorrectExam: React.FC<CorrectExamProps> = ({ children, data }) => {
  const [note, setNote] = useState<number>(0);
  const [item, setItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const examan = data?.classe?.exam_classe?.filter((item: any) => item?.id == data?.exam);
  const new_total_mark = examan[0]?.total_mark;
  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent'],
    queryFn: async () => await getCorigeExameContent(+examan[0]?.id, data?.id),
  });

  useEffect(() => {
    if (!isPendingCorrige && getCorrigeExamOfUser) {
      const initialNote = +getCorrigeExamOfUser[0]?.mark || 0;
      setNote(initialNote);
    }
  }, [isPendingCorrige, getCorrigeExamOfUser]);

  const handelCorrectExam = () => {
    const examanId = examan[0].id;
    const user_id = data?.id;
    router.push(pathname + `/students/${user_id}/correction/${examanId}`);
  };

  const handelSubmitCorrectionExam = (e: any) => {
    // Your logic for submitting the correction exam
    if (e.target.value > new_total_mark) {
      toast.error('la note ne doit pas depasser le total de la classe');
      return;
    }
    setNote(+e.target.value);
  };
  const handelSubmit = () => {
    console.log(note);
    console.log(item);
    if (!item) {
      console.log(note);
    } else {
      console.log(item);
    }
  };

  if (isPendingCorrige || !getCorrigeExamOfUser) {
    return <Loading />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Noter cet étudiant
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#959595] text-[15px]">Accorder une note</span>
            <div className="flex items-center gap-2">
              <div className=" relative w-[170px]  h-[54px] pr-10 rounded-lg bg-[#F0F6F8] text-2 flex items-center justify-center ">
                <Input
                  placeholder="--"
                  className="p-0 text-xl text-right bg-transparent border-none "
                  maxLength={new_total_mark?.toString().length}
                  // defaultValue={+getCorrigeExamOfUser[0]?.mark || 0}
                  value={note}
                  onChange={(e) => handelSubmitCorrectionExam(e)}
                />
                <span>/</span>
                <span className="flex items-center text-xl ">{new_total_mark}</span>
              </div>
            </div>
          </div>
          <span
            className="text-[#1B8392] text-xl h-1
"
          >
            ou
          </span>
          <div>
            <span className="text-[#959595] text-[15px]">Corriger l’examen</span>
            <div className="flex items-center gap-2">
              <div
                className=" relative w-[170px] p-3 pl-10 pr-10 rounded-lg bg-[#F0F6F8] flex items-center justify-center "
                onClick={handelCorrectExam}
              >
                <Image
                  src={'/iconbark.svg'}
                  alt="iconbark"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-[#F0F6F8] mb-4" />

        <div className="flex items-center gap-4">
          <span className="text-[#959595]">Marquer comme</span>
          <RadioGroup onValueChange={(value) => setItem(value)} className="flex">
            <div
              className="flex items-center space-x-2 border border-[#1B8392] p-1 text-[#1B8392] rounded-xl"
              style={item === 'absent' ? { backgroundColor: '#F0F6F8' } : {}}
            >
              <RadioGroupItem
                className=" bg-white text-[#1B8392] border-[#1B8392] scale-[0.6]"
                value="absent"
                id="r1"
                style={item === 'absent' ? { backgroundColor: '#1B8392' } : {}}
              />
              <Label htmlFor="r1" className="text-xs">
                Absent
              </Label>
            </div>

            <div
              className="flex items-center space-x-2 border border-[#1B8392] p-1 text-[#1B8392] rounded-xl"
              style={item === 'non-classe' ? { backgroundColor: '#F0F6F8' } : {}}
            >
              <RadioGroupItem
                className=" bg-white text-[#1B8392] border-[#1B8392] scale-[0.6]"
                value="non-classe"
                id="r2"
                style={item === 'non-classe' ? { backgroundColor: '#1B8392' } : {}}
              />
              <Label htmlFor="r1" className="text-xs">
                Non classé
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-white
          text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-full text-white bg-[#177C9A] hover:opacity-80"
            onClick={handelSubmit}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
