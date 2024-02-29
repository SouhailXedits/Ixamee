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

interface DeleteExame {

  exam_id: number;
  open: boolean;
  setOpen: (open: boolean) => void
}

export const DeleteExame = ({  exam_id ,open ,setOpen }: DeleteExame) => {
  const { deleteExam, isPending } = useDeleteExam();

  const handelDeletExam = async (exam_id: number) => {
    deleteExam(exam_id);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer cet examen
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Êtes-vous sûr de vouloir supprimer cet examen?Cette action ne peut être annulée.
        </DialogDescription>

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
            className="w-full text-white bg-[#F04438] hover:opacity-80"
            onClick={() => handelDeletExam(exam_id)}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
