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
import toast from 'react-hot-toast';

interface ImportUneClasseProps {
  children: React.ReactNode;
  class_id: string;
  etab_id: number;
}

export const ImportUneClasse = ({ children, class_id, etab_id }: ImportUneClasseProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { createManyUser, isPending, error } = useCreateManyUserInClass();
  const queryClient = useQueryClient();
  console.log(isPending);

  const user = queryClient.getQueryData(['user']) as any;


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
          <DialogTitle className="text-xl font-medium text-[#1B8392] ">
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
                className="absolute h-[180px] w-[210px] cursor-pointer bg-black opacity-0  "
                onChange={handleFileChange}
              />
              <div className="flex h-[180px] w-[210px] flex-col items-center justify-center gap-1 rounded-xl  border border-dashed border-[#177C9A] ">
                <Image src={'/csvfile.svg'} alt="csvfile" width={100} height={100} />
                <span className="text-sm text-[#959595]">Sélectionnez un fichier CSV</span>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-[#F0F6F8] p-2 text-[#1B8392]">
              <div className="flex items-center gap-2">
                <Image
                  src={'/filesvc2.svg'}
                  alt="csvfile"
                  width={30}
                  height={30}
                  className="stroke-black   text-[#1B8392]"
                />

                <span>{file?.name}</span>
              </div>

              <Image
                src={'/x-icon.svg'}
                alt="csvfile"
                width={20}
                height={20}
                className="flex   cursor-pointer items-end justify-end stroke-black text-[#1B8392]"
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
              className="w-full border border-[#177C9A] bg-white text-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleImport}
              className="w-full bg-[#1B8392] text-white hover:opacity-80"
            >
              Importer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
