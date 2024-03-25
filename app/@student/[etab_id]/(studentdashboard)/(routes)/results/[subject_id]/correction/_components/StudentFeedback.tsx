import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

interface studentFeadback {
  children: React.ReactNode;
  content: {
    feedback: string[];
    description: string;
  }
}
export const StudentFeedback = ({ children, content }: studentFeadback) => {
  console.log(content)
  const feedback = content?.feedback?.join(' ') 
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
          </DialogTitle>
        </DialogHeader>
        <div className=" h-[290px] p-1 rounded-lg overflow-scroll">
          <div className="flex flex-col gap-2">

            <p className=' font-semibold bg-8 p-1 rounded'>{feedback}</p>
            <p>{content?.description}</p>


          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};
