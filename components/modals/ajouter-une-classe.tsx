'use client';
import { getUserSubject } from '@/actions/examens';
import { useCreateClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreateClasse';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import * as z from 'zod';
import Select from 'react-select';
import { DialogClose } from '@radix-ui/react-dialog';

interface AjouterUneClasseProps {
  children: React.ReactNode;
  user_id: string;
  estab: number;
}

const schema = z.object({
  classe: z.string().min(1, { message: 'Nom Du Classe est requis' }),
  matiere: z.array(z.string()).min(1, { message: 'Matières est requis' }),
});

export const AjouterUneClasse = ({ children, user_id, estab }: AjouterUneClasseProps) => {
  const { createClass } = useCreateClasse();
  const [formatData, setFormatData] = useState({
    classe: '',
    matiere: '',
  });

  const { data: TeacherSubject } = useQuery({
    queryKey: ['teachersubject'],
    queryFn: async () => await getUserSubject(user_id),
  });

  const subjectOptions = TeacherSubject?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const resetFormatData = () => {
    setFormatData({
      classe: '',
      matiere: '',
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormatData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmitInput = () => {
    try {
      schema.parse(formatData);
      createClass({
        name: formatData.classe,
        matiere: formatData.matiere,
        establishmentId: estab,
        teacherId: user_id,
      });
      resetFormatData();
    } catch (error: any) {
      console.error(error); // Log the actual error for debugging purposes
    }
  };

  const isButtonDisabled = formatData.classe === '' || !formatData.matiere.length;

  return (
    <Dialog onOpenChange={() => resetFormatData()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium">
            Ajouter une classe
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
          options={subjectOptions}
          onChange={(selectedOptions) => handleInputChange('matiere', selectedOptions)}
          placeholder="Sélectionner votre classe"
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
        <DialogFooter>
          <DialogClose className="w-full">
            <Button
              type="submit"
              className={`w-full bg-[#1B8392] hover:opacity-80 ${
                isButtonDisabled ? 'pointer-events-none' : ''
              }`}
              onClick={handleSubmitInput}
              disabled={isButtonDisabled}
            >
              Ajouter
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
