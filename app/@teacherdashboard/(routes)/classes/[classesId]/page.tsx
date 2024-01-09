import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { StudentList } from './_components/student-list';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';

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
          <Select>
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/icons/kebab-menu.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Filter</span>
                  </div>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corrige" className="">
                Corrigé
              </SelectItem>
              <SelectItem value="en-cours">En cours</SelectItem>
              <SelectItem value="non-corrigé">Non corrigé</SelectItem>
              <SelectItem value="non-classé">Non classé</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>

          {/* importer */}
          <ImportUneClasse>
            <div className=" justify-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Importer
              </div>
            </div>
          </ImportUneClasse>

          <AjouterUnEtudiant>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant>
        </div>
      </nav>

      <div>
        <StudentList />
      </div>
    </main>
  );
};

export default Student;
