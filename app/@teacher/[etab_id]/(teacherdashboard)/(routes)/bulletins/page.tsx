import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';

import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import MarkSheetStudentList from './components/StudentsList';

const Student = ({ params }: { params: { classesId: string } }) => {
  const { classesId } = params;
  const handleImportedData = (jsonData: any) => {
    // Handle the imported data in the external page
    console.log(jsonData);
  };

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Classes</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <Link href={'/classes'} className="cursor-pointer">
              Classes
            </Link>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">d’étudiants</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* importer */}
          <ImportUneClasse>
            <div className=" justify-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/download-icon.svg" alt="download icon" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Télécharger en pdf
              </div>
            </div>
          </ImportUneClasse>
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>

          {/* <AjouterUnEtudiant>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant> */}

          <Select>
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Period</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester1" className="">
                Semestre 1
              </SelectItem>
              <SelectItem value="semester2">Semestre 2</SelectItem>
              <SelectItem value="tremester1">Trimester 1</SelectItem>
              <SelectItem value="tremester2">Trimester 2</SelectItem>
              <SelectItem value="tremester3">Trimester 3</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Classe</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bac_math_2">Bac math 2</SelectItem>
              <SelectItem value="bac_info">Bac Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <div>
        <MarkSheetStudentList />
      </div>
    </main>
  );
};

export default Student;
