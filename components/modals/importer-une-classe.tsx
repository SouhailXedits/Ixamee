'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { use, useState } from 'react';
import { Label } from '../ui/label';
import csvtojson from 'csvtojson';
import { useCreateManyUserInClass } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreteManyUser';
import { useQueryClient } from '@tanstack/react-query';

interface ImportUneClasseProps {
  children: React.ReactNode;
  class_id: string;
  etab_id: number;
}

export const ImportUneClasse = ({ children, class_id, etab_id }: ImportUneClasseProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { createManyUser, isPending, error } = useCreateManyUserInClass();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;
  console.log(user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (file) {
      const jsonData = await convertCsvToJson(file);
      const newData = jsonData.map((item: { name: string; email: string }) => ({
        image: '',
        name: item.name,
        range: 1,
        email: item.email,
        class_id: class_id,
        term: user?.term,
        establishmentId: +etab_id,
      }));

      // jsonData.map((item: { name: string; email: string }) => {
      createManyUser(newData);
      // });
    }
  };

  const convertCsvToJson = async (csvFile: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const csvData = event.target?.result as string;
          const lines = csvData.trim().split('\n'); // Trim and split the CSV data into lines
          const jsonData = lines.map((line) => {
            const [name, email] = line.split(';'); // Split each line into name and email
            return { name, email };
          });
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsText(csvFile);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Importer une classe
          </DialogTitle>
        </DialogHeader>
        <div className="transition-all duration-300 ease-in">
          {!file ? (
            <div className="flex items-center justify-center p-3 pb-5">
              <input
                id="picture"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="opacity-0 absolute w-[210px] h-[180px] bg-black cursor-pointer  "
                onChange={handleFileChange}
              />
              <div className="border-dashed border border-[#177C9A] w-[210px] h-[180px] rounded-xl items-center flex  justify-center flex-col gap-1 ">
                <Image src={'/csvfile.svg'} alt="csvfile" width={100} height={100} />
                <span className="text-[#959595] text-sm">Sélectionnez un fichier CSV</span>
              </div>
            </div>
          ) : (
            <div className="p-2 bg-[#F0F6F8] rounded-lg text-[#1B8392] flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={'/filesvc2.svg'}
                  alt="csvfile"
                  width={30}
                  height={30}
                  className="text-[#1B8392]   stroke-black"
                />

                <span>{file?.name}</span>
              </div>

              <Image
                src={'/x-icon.svg'}
                alt="csvfile"
                width={20}
                height={20}
                className="text-[#1B8392]   stroke-black flex cursor-pointer justify-end items-end"
                onClick={() => {
                  setFile(null);
                }}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => setFile(null)}
              className="w-full bg-white text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleImport}
              className="w-full text-white bg-[#1B8392] hover:opacity-80"
            >
              Importer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
