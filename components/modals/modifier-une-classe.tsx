'use client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Select from 'react-select';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditeClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeClasse';
import {
  getSubjectOfUser,
  getSubjectOfUserById,
  getUserSubject,
} from '@/actions/examens';

interface Subject {
  id: string;
  name: string;
}

interface ClassData {
  id: string;
  name: string;
  subject: Subject[];
}

interface ModifierUneClasseProps {
  data: ClassData;
}

const schema = z.object({
  classe: z.string().min(1, { message: 'Nom Du Classe est requis' }),
  matiere: z.array().min(1, { message: 'Matières est requis' }),
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { etab_id, user_id } = context.query;

  const subjectData = await getSubjectOfUserById(user_id as string);
  const userSubjectData = await getUserSubject(user_id as string);

  return {
    props: {
      data: {
        id: etab_id as string,
        name: '',
        subject: subjectData,
      },
      userSubjects: userSubjectData,
    },
  };
};

export default function ModifierUneClasse({ data, userSubjects }: ModifierUneClasseProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { etab_id } = router.query;
  const { editeClass, isPending } = useEditeClasse();

  const Teachersubject = queryClient.getQueryData(['teacherSubject']) as any;
  const subjectoptions = Teachersubject?.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const defaults = subjectoptions?.filter((option: any) =>
    data.subject.find((subject: any) => subject.id === option.value)
  );

  const [formatData, setFormatData] = useState({
    classe: data?.name,
    matiere: defaults,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormatData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handelSubmitInput = () => {
    try {
      schema.parse(formatData);
      editeClass({
        name: formatData.classe,
        classe_id: +data?.id,
        matiere: formatData.matiere,
      });
      router.push(`/@teacher/${etab_id}/(teacherdashboard)/(routes)/classes`);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Modifier une classe
          </DialogTitle>
        </DialogHeader>
        <Label className="text-[#959595]">
          Nom Du Classe <span className="text-red">*</span>
        </Label>
        <Input
          placeholder="Saisr le nom de votre classe"
          className="placeholder:text-[#959595] text-[#959595] "
          onChange={(e) => handleInputChange('classe', e.target.value)}
          value={formatData.classe}
        />
        <Label className="text-[#959595]">
          Matières <span className="text-red">*</span>
        </Label>

        <Select
          isMulti
          options={subjectoptions}
          onChange={(selectedOptions) => handleInputChange('matiere', selectedOptions)}
          placeholder="Sélectionner votre classe"
          defaultValue={data.subject.map((item: any) => ({
            value: item.id,
            label: item.name,
          }))}
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '14px',
              borderRadius: 12,
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1/4px solid #727272',
              fontSize: '14px',
              outline: '#727272',
              minWidth: '220px',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,

            colors: {
              ...theme.colors,
              primary: 'none',
            },
          })}
        />

        {/* Choisir le rang de classe */}

        <DialogFooter>

