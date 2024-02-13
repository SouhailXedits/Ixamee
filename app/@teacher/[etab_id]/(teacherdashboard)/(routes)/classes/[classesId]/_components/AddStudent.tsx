import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';

function AddStudent({ classesId, etab_id }: any) {
  return (
    <>
      <AjouterUnEtudiant class_id={classesId} etab_id={etab_id}>
        <div className="flex items-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
          <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
            Ajouter un étudiant
          </div>
        </div>
      </AjouterUnEtudiant>
    </>
  );
}

export default AddStudent;
