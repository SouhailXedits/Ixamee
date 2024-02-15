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
import { useCreateExamCorrection } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeExamCorrection';
import { useEditeExamStatus } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeExamStatus';
import { set } from 'date-fns';

interface CorrectExamProps {
  children: React.ReactNode;
  data: any;
  user_id: string;
}

export const CorrectExam: React.FC<CorrectExamProps> = ({ children, data, user_id }) => {
  const [note, setNote] = useState<string>('0');
  const [item, setItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const new_total_mark = data?.exam?.total_mark || 0;

  useEffect(() => {
    const userData = data?.find((item: any) => item?.user_id === user_id);
    if (userData) {
      const initialNote = userData.mark_obtained || '0';
      setNote(initialNote);
    }
  }, [data, user_id]);

  const handelCorrectExam = () => {
    const examanId = data?.exam_id;
    router.push(`${pathname}/student/${user_id}/correction/${examanId}`);
  };

  const handelSubmitCorrectionExam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) > new_total_mark) {
      toast.error('la note ne doit pas depasser le total de la classe');
      return;
    }
    setNote(value);
  };

  const { createExamCorrectionn, isPending } = useCreateExamCorrection();
  const { editeStatus, isPending: isPendingStatus } = useEditeExamStatus();

  const handelSubmit = () => {
    if (!item) {
      const obj = {
        exam_id: data?.exam_id,
        mark_obtained: note,
        user_id: user_id,
      };
      createExamCorrectionn(obj);
    } else {
      const obj = {
        exam_id: data?.exam_id,
        user_id: user_id,
        status: item as 'notClassified' | 'absent',
      };
      editeStatus(obj);
    }
  };

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
                  type="number"
                  placeholder="--"
                  className="p-0 text-xl text-right bg-transparent border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  maxLength={new_total_mark.toString().length}
                  min={0}
                  value={note}
                  onChange={handelSubmitCorrectionExam}
                />
                <span>/</span>
                <span className="flex items-center text-xl ">{new_total_mark}</span>
              </div>
            </div>
          </div>
          <span className="text-[#1B8392] text-xl h-1">ou</span>
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
              style={item === 'notClassified' ? { backgroundColor: '#F0F6F8' } : {}}
            >
              <RadioGroupItem
                className=" bg-white text-[#1B8392] border-[#1B8392] scale-[0.6]"
                value="notClassified"
                id="r2"
                style={item === 'notClassified' ? { backgroundColor: '#1B8392' } : {}}
              />
              <Label htmlFor="r2" className="text-xs">
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
          {isPending ? (
            <DialogClose>
              <Button type="submit" className="w-full text-white bg-[#177C9A] hover:opacity-80">
                <div
                  className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue rounded-full dark:text-blue"
                  role="status"
                  aria-label="loading"
                ></div>
              </Button>
            </DialogClose>
          ) : (
            <DialogClose>
              <Button
                type="submit"
                className="w-full text-white bg-[#177C9A] hover:opacity-80"
                onClick={handelSubmit}
              >
                Enregistrer
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
