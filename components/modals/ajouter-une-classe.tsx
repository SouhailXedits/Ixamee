'use client';
import { getUserSubject } from '@/actions/examens';
import { useCreateClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreateClasse';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
interface AjouterUneClasse {
  children: React.ReactNode;
  user_id: string;
  estab: number;
}

import * as z from 'zod';

const schema = z.object({
  classe: z.string().min(1, { message: 'Nom Du Classe est requis' }),
  // matiere: z.array().min(1, { message: 'Matières est requis' }),
});
import Select from 'react-select';
import { DialogClose } from '@radix-ui/react-dialog';

export const AjouterUneClasse = ({ children, user_id, estab }: AjouterUneClasse) => {
  console.log(user_id, estab);
  const queryClient = useQueryClient();

  const { createClass, isPending } = useCreateClasse();
  // const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
  //   queryKey: ['teachersubject'],
  //   queryFn: async () => await getUserSubject(user_id),
  // });
  const Teachersubject = queryClient.getQueryData(['teacherSubject']) as any;
  const subjectoptions = Teachersubject?.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const [formatData, setFormatData] = useState({
    classe: '',
    matiere: '',
  });
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
  const handelSubmitInput = () => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
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

          // disabled={formatData.classe.length > 0 || formatData.rang.length > 0}
        />
        {/* CHoisir votre classe */}
        <Label className="text-[#959595]">
          Matières <span className="text-red">*</span>
        </Label>
        {/* <Select onValueChange={(value) => handleInputChange('matiere', value)}>
          <SelectTrigger className="w-full text-[#959595]">
            <SelectValue placeholder="Choisir votre classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choisir votre Matières</SelectLabel>
              {Teachersubject?.map((item) => (
                <SelectItem key={item.id} value={item?.name} className="flex">
                  {item?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Select
          isMulti
          options={subjectoptions}
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

        {/* Choisir le rang de classe */}

        <DialogFooter>
          {formatData.classe === '' || formatData.matiere === '' ? (
            <Button
              type="submit"
              className="w-full bg-[#1B8392] hover:opacity-80"
              onClick={handelSubmitInput}
              disabled={formatData.classe === '' || formatData.matiere === ''}
            >
              Ajouter
            </Button>
          ) : (
            <DialogClose className="w-full ">
              <Button
                type="submit"
                className="w-full bg-[#1B8392] hover:opacity-80"
                onClick={handelSubmitInput}
                disabled={formatData.classe === '' || formatData.matiere === ''}
              >
                Ajouter
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
