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
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState } from 'react';

interface AjouterUneClasse {
  children: React.ReactNode;
}
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ExamInput } from '@/actions/examens/schema';
export const AddExameModal = ({ children }: AjouterUneClasse) => {
  const form = useForm<z.infer<typeof ExamInput>>({
    resolver: zodResolver(),
    defaultValues: {
      name: '',
      total_mark: '',
      rememberMe: false,
    },
  });

  const options = [
    { value: 'trimestre_1', label: '1ère Année Secondaire' },
    { value: 'trimestre_2', label: '2ème Année Secondaire' },
    { value: 'trimestre_3_sciences', label: '3ème Année Sciences' },
    { value: 'bac_maths', label: 'Bac Maths' },
    { value: 'bac_techniques', label: 'Bac Techniques' },
  ];
  const [clickedStyle, setClickedStyle] = useState('fr');
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter un examen
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className="flex flex-col gap-6 placeholder:text-[#727272]">
            <div className="flex flex-col gap-2">
              <Label className="text-[#959595]">
                établissement <span className="text-red">*</span>{' '}
              </Label>
              <Input
                placeholder="Sélectionner votre établissement"
                className="placeholder:text-[#727272]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#959595]">
                Nom de l’examen<span className="text-red">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Entrer le nom de votre examen"
                className="placeholder:text-[#727272]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#959595]">
                Trimestre / Semestre <span className="text-red">*</span>
              </Label>

              <Select2>
                <SelectTrigger className="w-full placeholder:text-[#727272] text-[#727272]">
                  <SelectValue placeholder="Sélectionner la trimestre ou semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trimestre_1">Trimestre 1</SelectItem>
                  <SelectItem value="trimestre_2">Trimestre 2</SelectItem>
                  <SelectItem value="trimestre_3">Trimestre 3</SelectItem>
                  <SelectItem value="trimestre_4">Semestre 1</SelectItem>
                  <SelectItem value="trimestre_5">Semestre 2</SelectItem>
                </SelectContent>
              </Select2>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <Label className="text-[#959595]">
                  Classe(s) <span className="text-red">*</span>
                </Label>

                <Select
                  isMulti
                  options={options}
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
              </div>
              <div>
                <Label className="text-[#959595]">
                  Matière <span className="text-red">*</span>
                </Label>
                <Select
                  isMulti
                  options={options}
                  placeholder="Sélectionner la matière"
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
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="w-[50%]">
                <Label className="text-[#959595]">
                  Note totale <span className="text-red">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Saisir la note totale"
                  className="placeholder:text-[#727272]"
                />
              </div>
              <div className="w-[50%]">
                <Label className="text-[#959595]">
                  Matière <span className="text-red">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Saisir le coefficient"
                  className="placeholder:text-[#727272]"
                />
              </div>
            </div>
            <div>
              <Label className="text-[#959595]">Style</Label>
              <div className="flex gap-5">
                <div
                  className={cn(
                    'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
                    clickedStyle == 'fr' && 'border-[#1B8392] text-[#1B8392] '
                  )}
                  onClick={() => setClickedStyle('fr')}
                >
                  <Image
                    src={clickedStyle == 'fr' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
                    alt="examStyle"
                    width={20}
                    height={20}
                  />
                  <span>Français</span>
                </div>
                <div
                  className={cn(
                    'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
                    clickedStyle == 'ar' && 'border-[#1B8392] text-[#1B8392] '
                  )}
                  onClick={() => setClickedStyle('ar')}
                >
                  <span>Arabe</span>
                  <Image
                    src={clickedStyle == 'ar' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
                    alt="examStyle"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button
            // onClick={() => {}}
            type="submit"
            className="w-full bg-[#1B8392] hover:opacity-80 "
          >
            {' '}
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
