'use client';
import { Button } from '@/components/ui/button';
import {
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
import Select from 'react-select';
import Image from 'next/image';
import {
  Select as Select2,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { use, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import {
  createExamm,
  getClasseOfUser,
  getEstablishmentOfUser,
  getMe,
  getSubjectOfUser,
  getTermOfUser,
} from '@/actions/examens';
import { Skeleton } from '../ui/skeleton';
import { useCreateExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useCreateExam';
import { SubjectOutputProps } from '@/types/subjects/subjectTypes';

interface Establishment {
  id: number;
  name: string;
}

interface EstablishmentData {
  establishement: Establishment;
}

export const AddExameModal = ({ children }: AjouterUneClasse) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const teacherEstab = queryClient.getQueryData(['teacherEstab']);

  const user_id = user?.id;

  const userEstablishment = teacherEstab;

  const userEstablishmentoptions = userEstablishment?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

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
      .object({
        value: z.number(),
        label: z.string(),
      })
      .refine((value) => value.value !== 0, {
        message: 'Matière is required',
      }),
    totalMarks: z.number().min(1, { message: 'Total Marks is required' }),
    coefficient: z.string().min(1, { message: 'Coefficient is required' }),
    style: z.string(),
  });

  const [formData, setFormData] = useState({
    establishment: [],
    name: '',
    term: '',
    classes: [],
    subject: '',
    totalMarks: 0,
    coefficient: '',
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

  const classoption = classe?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const { mutate: creatExam, isLoading: isPending } = useCreateExam();

  const verfierSchema = () => {
    let ok = false;
    try {
      examSchema.parse(formData);
      ok = true;
    } catch (error) {
      console.log(error);
    }
    return ok;
  };

  const handleSubmit = async () => {
    try {
      // Validate the form data
      examSchema.parse(formData);
      creatExam({ data: formData, user_id });

      // Clear form errors
      setFormErrors(null);
    } catch (error: any) {
      // If validation fails, update form errors
      setFormErrors(error);
    }
  };

  const renderFieldError = (fieldName: string) =>
