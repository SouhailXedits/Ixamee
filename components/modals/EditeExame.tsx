import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select, { components } from 'react-select';
import Image from 'next/image';
import {
  Skeleton,
  use,
  useEffect,
  useState,
} from '@/lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExamm,
  getClasseOfUser,
  getEstablishmentOfUser,
  getMe,
  getSubjectOfUser,
  getTermOfUser,
} from '@/actions/examens';
import { cn } from '@/lib/utils';
import { useEditExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useEditeExam';
import { SubjectOutputProps } from '@/types/subjects/subjectTypes';

interface AjouterUneClasse {
  children: React.ReactNode;
  exam: any;
}

interface Establishment {
  id: number;
  name: string;
}

interface EstablishmentData {
  establishement: Establishment;
}

export const EditeExame = ({ children, exam }: AjouterUneClasse) => {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(['user']);
  const teacherEstab: any = queryClient.getQueryData(['teacherEstab']);

  const user_id = user?.id;

  const userEstablishment = teacherEstab;

  const userEstablishmentoptions = userEstablishment?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  const exam_Establishment = exam.exam_classess[0].establishment[0];
  const defaultEstablishment = userEstablishmentoptions?.find(
    (item: any) => item.value === exam_Establishment.id
  );

  const examSchema = z.object({
    establishment: z
      .array(z.object({ value: z.number(), label: z.string() }))
      .refine((value) => value.length > 0, {
        message: 'Establishment is required',
      }),
    name: z.string().min(1, { message: 'Name is required' }),
    term: z.string().min(1, { message: 'Term is required' }),
    classes: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
        })
      )
      .refine((data) => data.length >= 1, {
        message: "L'classes est requis",
      }),
    subject: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
        })
      )
      .refine((value) => value.length >= 0, {
        message: 'Matière is required',
      }),
    totalMarks: z.string().min(1, { message: 'Total Marks is required' }),
    coefficient: z.string().min(1, { message: 'Coefficient is required' }),
    style: z.string(),
  });

  const [formData, setFormData] = useState({
    establishment: [defaultEstablishment],
    name: exam?.name,
    term: exam?.term,
    classes: [],
    subject: '',
    totalMarks: exam?.total_mark + '',
    coefficient: exam.coefficient + '',
    style: 'fr',
    user_id: '',
  });

  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const { data: TeacherClasse, isPending: isPendingTeacherClasse } = useQuery({
    queryKey: ['teacherClasse', formData?.establishment],
    queryFn: async () => await getClasseOfUser(user_id, formData?.establishment),
  });

  const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
    queryKey: ['teachersubject', formData?.classes],
    queryFn: async () => await getSubjectOfUser(user_id, formData?.classes),
  });

  const { data: Teacherterm, isPending: isPendingTeacherterm } = useQuery({
    queryKey: ['teacherTerm'],
    queryFn: async () => await getTermOfUser(user_id),
  });

  const subject = Teachersubject;
  const term = Teacherterm;
  const classe = TeacherClasse;

  const subjectoptions = subject?.map((item: SubjectOutputProps) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const currentSubjects = exam.subject_id;

  const currentSubject = subjectoptions?.filter((item: any) => {
    return item?.value === currentSubjects;
  });

  const classoption = classe?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const currentClasse = exam.exam_classess[0];

  let defaultClasse = classoption?.find((item: any) => {
    return item?.value === currentClasse?.id;
  });

  defaultClasse = [defaultClasse];

  useEffect(() => {
    handleInputChange('classes', defaultClasse);

