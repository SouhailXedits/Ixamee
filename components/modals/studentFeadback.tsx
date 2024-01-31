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
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface studentFeadback {
  children: React.ReactNode;
}
export const StudentFeadback = ({ children }: studentFeadback) => {
  const [feedback, setFeedback] = useState([]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            <div className="absolute -top-14 -left-16">
              <Image
                src="/bigEditNote.svg"
                width={100}
                height={100}
                alt="editicon"
                className="cursor-pointer"
              />
            </div>
            Ajouter une remarque
          </DialogTitle>
        </DialogHeader>
        <div className=" h-[200px] border border-9 p-1 rounded-lg">
          <Textarea
            className="border-none resize-none text-[#B5B5B5] placeholder:text-[#B5B5B5] "
            placeholder="Tapez votre remarque ici."
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-white
          text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full text-white bg-2 hover:opacity-80">
            Soumettre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
