'use client';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Label } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { useEditUser } from '../hooks/useEditUser';
import { getUserIdByEmail } from '@/actions/teachers';

interface AddTeacherProps {
  children: React.ReactNode;
}

export const AddTeacher = ({ children }: AddTeacherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const { mutate: updateUserToAdmin, isLoading } = useEditUser();

  const { data: user } = useQuery(['user', email], () => getUserIdByEmail(email), {
    enabled: email.length > 0,
    select: (data) => data[0],
  });

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setError('');
    } else {
      setUserId(null);
      setError('Aucun enseignant n’est inscrit avec cette adresse e-mail ou l’utilisateur n’est pas un enseignant. Veuillez réessayer.');
    }
  }, [user]);

  const handleAddingAdmin = () => {
    if (userId) {
      updateUserToAdmin(userId);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[518px]">
          <DialogHeader>
            <DialogTitle className="text-[#1B8392] text-xl font-medium ">Ajouter un admin</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            {error && (
              <p className="rounded text-red p-1 text-sm bg-red/10">{error}</p>
            )}
            <div className="flex flex-col gap-2">
              <Label className="text-[#959595]">
                E-mail <span className="text-red">*</span>
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Entrer l'e-mail de l'admin"
                className="placeholder:text-[#727272]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose className=" w-full">
              <Button
                onClick={handleAddingAdmin}
                type="submit"
                disabled={userId === null || isLoading}
                className="w-full bg-[#1B8392] hover:opacity-80 "
              >
                Ajouter
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
