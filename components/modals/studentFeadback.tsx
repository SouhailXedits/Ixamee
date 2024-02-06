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
import { useEditeExamFeedback } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeExamRemarque';

interface studentFeadback {
  children: React.ReactNode;
  params: any;
}
export const StudentFeadback = ({ children, params }: studentFeadback) => {
  console.log(params);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<any>();

  console.log(feedback);
  const [listFeedback, setListFeedback] = useState([
    'Excellent travail! Vous êtes sur la bonne voie!',
    'Bon travail! Continuez ainsi.',
    'Assez bien! Vous pouvez mieux faire la prochaine fois!',
    'Travail insuffisant!',
  ]);
  const { editeFeedback, isPending } = useEditeExamFeedback();
  const handelSubmitFeedback = () => {
    console.log(feedback);
    console.log(feedbackMessage);
    const newfedback = {
      feedback,
      description: feedbackMessage,
    };
    const obj = {
      exam_id: params.exam_id,
      student_id: params.student_id,
      newFeedback : newfedback,
    };
    editeFeedback(obj);
    console.log(newfedback);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[545px]">
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
        <div className=" h-[290px] border border-9 p-1 rounded-lg overflow-scroll">
          <div className="flex flex-col gap-2">
            {feedback.map((item: string) => {
              return (
                <div
                  key={item}
                  className="bg-[#F0F6F8] flex items-center justify-between text-11 rounded-lg p-2 cursor-pointer"
                >
                  <span>{item}</span>
                  <Image
                    src={'/gray-x-icon.svg'}
                    width={20}
                    height={20}
                    alt="x"
                    onClick={() => {
                      setFeedback(feedback.filter((i) => i !== item));
                    }}
                  />
                </div>
              );
            })}
          </div>
          <Textarea
            className="border-none resize-none  placeholder:text-[#B5B5B5] "
            placeholder="Tapez votre remarque ici."
            onChange={(e) => setFeedbackMessage(e.target.value)}
            value={feedbackMessage}
          />
          {feedback.length === 0 && (
            <div className="flex flex-col gap-2">
              {listFeedback.map((item) => {
                return (
                  <div
                    key={item}
                    className="bg-[#F0F6F8] text-11 rounded-lg p-2 cursor-pointer"
                    onClick={() => setFeedback([...feedback, item])}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
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
          <Button
            type="submit"
            className="w-full text-white bg-2 hover:opacity-80"
            onClick={handelSubmitFeedback}
          >
            Soumettre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
