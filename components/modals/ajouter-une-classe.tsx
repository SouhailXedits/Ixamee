'use client';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface AjouterUneClasse {
  children: React.ReactNode;
}
export const AjouterUneClasse = ({ children }: AjouterUneClasse) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter une classe
          </DialogTitle>
        </DialogHeader>

        {/* CHoisir votre classe */}
        <Select>
          <SelectTrigger className="w-full text-[#959595]">
            <SelectValue placeholder="Choisir votre classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choisir votre classe</SelectLabel>
              <SelectItem value="1ere_annee_secondaire">1ère Année Secondaire</SelectItem>
              <SelectItem value="2eme-annee-secondaire">2ème Année Secondaire</SelectItem>
              <SelectItem value="3eme-annee-sciences">3ème Année Sciences</SelectItem>
              <SelectItem value="bac-maths">Bac Maths</SelectItem>
              <SelectItem value="bac-techniques">Bac Techniques</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Choisir le rang de classe */}
        <Select>
          <SelectTrigger className="w-full text-[#959595]">
            <SelectValue placeholder="Choisir le rang de la classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choisir le rang de la classe</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="flex items-center justify-center w-full text-lg  text-[#1B8392]">ou</span>
        <Input placeholder="Entrer le nom de la classe" />
        <DialogFooter>
          <Button type="submit" className="w-full bg-[#1B8392] hover:opacity-80">
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
