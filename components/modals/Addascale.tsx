import { useDeleteExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useDeleteExam';
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
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import RenderExercice from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/_components/renderExercice';
import RenderQuestion from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/_components/renderQuestion';
import RenderSubQuestion from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/_components/renderSubQuestion';
import { calcSumOfMarks } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/[examenId]/_components/subsubQuestionSharedFunction';
import toast from 'react-hot-toast';
import { useEditExamContent } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useEditExamContent';

interface DeleteExame {
  children: React.ReactNode;
  exam: any;
}

export const Addascal = ({ children, exam }: DeleteExame) => {
  // use State for the update the state :
  console.log(exam);
  const totalMarkOfExam = exam?.total_mark;
  const [content, setContent] = useState<any>(exam?.content);
  // handel get the exam
  console.log(content);

  // the content of the exam :
  useEffect(() => {
    setContent(exam?.content);
  }, [exam?.content]);
  const whidth = exam?.content?.length * 200;
  let some = 0;
  const result = content?.map((item: any) => {
    const mark = calcSumOfMarks(item);
    item.mark = mark;
    some = some + mark;
  });
  const { editExam, isPending: isPendingEdit } = useEditExamContent();

  const handelUpdateContentOExam = () => {
    editExam({ exam_id: exam.id, content });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={`sm:max-w-[680px]`}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter un barème
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal flex gap-2  ">
          {content?.map((item: any) => {
            console.log(item);
            return (
              <div className=" min-w-[200px] border-[#dedbdb] border-[1px] p-2  rounded-lg flex flex-col gap-2 ">
                <div className="flex gap-[10px]">
                  <div className="text-[#999999]">
                    {/* name Of Exerciec */}
                    {item.name}
                  </div>
                  <span className="text-[#F04438]">({calcSumOfMarks(item)} pts)</span>
                </div>
                {item.children && (
                  <>
                    {/* Render the I) */}
                    <div className="flex flex-col pl-2 gap-[10px] ">
                      {item.children.map((child: any) => (
                        <>
                          <RenderExercice child={child} content={content} setContent={setContent} />
                          <div className="flex flex-col gap-[10px]  pl-6">
                            {child.children.map((child: any) => (
                              <>
                                <RenderQuestion
                                  child={child}
                                  content={item}
                                  setContent={setContent}
                                />
                                <div className="flex flex-col gap-[10px]  pl-6">
                                  {child?.children?.map((child: any) => (
                                    <RenderSubQuestion
                                      child={child}
                                      content={item}
                                      setContent={setContent}
                                    />
                                  ))}
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </DialogDescription>
        <DialogClose>
          <DialogFooter>
            <Button
              type="submit"
              disabled={some >= totalMarkOfExam}
              className="w-full text-white bg-2 hover:opacity-80"
              onClick={() => handelUpdateContentOExam()}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};