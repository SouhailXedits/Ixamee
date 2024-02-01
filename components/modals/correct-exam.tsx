// const CorrectExam = () => {
'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
interface CorrectExam {
  children: React.ReactNode;
  data: any;
}
export const CorrectExam = ({ children, data }: CorrectExam) => {
  console.log(data.exam);
  let examan = data?.classe?.exam_classe?.filter((item) => item?.id == data?.exam);
  const new_total_mark = examan[0]?.total_mark;
  const router = useRouter();
  const pathname = usePathname();

  const totalMark = data?.classe?.total_mark || 0;

  
  const [item, setItem] = useState<string | null>(null);
  const [note, setNote] = useState(0);
  const handelCorrectExam = () => {
    const examanId = examan[0].id;
    const user_id = data?.id;
    router.push(pathname + `/students/${user_id}/correction/${examanId}`);
  };
  const handelSubmitCorrectionExam = () => {};
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
                  value={note}
                  onChange={(e) => setNote(+e.target.value)}
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
            onClick={handelSubmitCorrectionExam}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
