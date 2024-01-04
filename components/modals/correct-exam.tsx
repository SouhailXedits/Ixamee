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
interface CorrectExam {
  children: React.ReactNode;
}
export const CorrectExam = ({ children }: CorrectExam) => {
  const [item, setItem] = useState<string | null>(null);
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
              <div className=" relative w-[170px] p-2 pl-10 pr-10 rounded-lg bg-[#F0F6F8] flex items-center justify-center">
                <div className=" flex items-center justify-center   text-lg  text-[#1B8392] flex-1">
                  <Input
                    placeholder="--"
                    className="w-6 p-0 text-xl text-right bg-transparent border-none"
                    maxLength={2}
                  />
                  <span>/</span>
                  <span className="flex items-center text-xl ">20</span>
                </div>
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
              <div className=" relative w-[170px] p-3 pl-10 pr-10 rounded-lg bg-[#F0F6F8] flex items-center justify-center ">
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
          <Button type="submit" className="w-full text-white bg-[#177C9A] hover:opacity-80">
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
