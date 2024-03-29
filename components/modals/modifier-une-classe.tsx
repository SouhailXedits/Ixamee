'use client';
import { getSubjectOfUser, getSubjectOfUserById, getUserSubject } from '@/actions/examens';
import { useCreateClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreateClasse';
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

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
interface AjouterUneClasse {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

import * as z from 'zod';

const schema = z.object({
  classe: z.string().min(1, { message: 'Nom Du Classe est requis' }),
  // matiere: z.array().min(1, { message: 'Matières est requis' }),
});
import Select from 'react-select';
import { useEditeClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeClasse';

export const ModifierUneClasse = ({ data, open, setOpen }: AjouterUneClasse) => {
  const classesubject = data?.subject;
  const queryClient = useQueryClient();
  const { editeClass, isPending } = useEditeClasse();

  // const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
  //   queryKey: ['teachersubject'],
  //   queryFn: async () => await getSubjectOfUserById(data?.teacher_id),
  // });
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
      // createClass({
      //   name: formatData.classe,
      //   matiere: formatData.matiere,
      //   establishmentId: estab,
      //   teacherId: user_id,
      // });

      editeClass({
        name: formatData.classe,
        classe_id: +data?.id,
        matiere: formatData.matiere,
      });
    } catch (error: any) {
      console.error(error); // Log the actual error for debugging purposes
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          defaultValue={classesubject.map((item: any) => ({
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
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-[#1B8392] hover:opacity-80"
              onClick={handelSubmitInput}
            >
              Enregistrer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

ModifierUneClasse;
