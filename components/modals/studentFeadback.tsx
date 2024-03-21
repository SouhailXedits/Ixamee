'use client';
import { Button, Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Textarea } from '@/components/ui';
import Image from 'next/image';
import { useState } from 'react';
import { useEditeExamFeedback } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeExamRemarque';

interface StudentFeedbackProps {
  children: React.ReactNode;
  params: any;
}

export const StudentFeedback = ({ children, params }: StudentFeedbackProps) => {
  const [feedback, setFeedback] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const { editeFeedback, isPending } = useEditeExamFeedback();

  const listFeedback = [
    'Excellent travail! Vous êtes sur la bonne voie!',
    'Bon travail! Continuez ainsi.',
    'Assez bien! Vous pouvez mieux faire la prochaine fois!',
    'Travail insuffisant!',
  ];

  const handleAddFeedback = (item: string) => {
    setSelectedFeedback((prev) => [...prev, item]);
    setFeedback((prev) => prev.filter((i) => i !== item));
  };

  const handleRemoveFeedback = (item: string) => {
    setSelectedFeedback((prev) => prev.filter((i) => i !== item));
    setFeedback((prev) => [...prev, item]);
  };

  const handleSubmitFeedback = () => {
    setFeedback((prev) => [...prev, ...selectedFeedback]);
    const newFeedback = {
      feedback: [...new Set([...feedback, ...selectedFeedback])],
      description: feedbackMessage,
    };
    const obj = {
      exam_id: params.exam_id,
      student_id: params.student_id,
      newFeedback,
    };
    editeFeedback(obj);
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
            {selectedFeedback.map((item: string) => (
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
                  onClick={() => handleRemoveFeedback(item)}
                />
              </div>
            ))}
            {feedback.map((item: string) => (
              <div
                key={item}
                className="bg-[#F0F6F8] text-11 rounded-lg p-2 cursor-pointer"
                onClick={() => handleAddFeedback(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <Textarea
            className="border-none resize-none  placeholder:text-[#B5B5B5] "
            placeholder="Tapez votre remarque ici."
            onChange={(e) => setFeedbackMessage(e.target.value)}
            value={feedbackMessage}
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
          <Button
            type="submit"
            className="w-full text-white bg-2 hover:opacity-80"
            onClick={handleSubmitFeedback}
            disabled={isPending}
          >
            {isPending ? 'Enregistrement...' : 'Soumettre'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
