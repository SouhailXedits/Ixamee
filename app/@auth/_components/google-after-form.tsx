'use client';
import { useState } from 'react';
import ProfAfterGoogleForm from './Prof-after-google-form';
import EtudiantAfterGoogleForm from './Etudiant-after-google-form';
interface FormProps {
  session: any ;
}
export default function GoogleAfterForm({ session }: FormProps) {
  const [role, setRole] = useState<string>('TEACHER');
  const handleRole = (role: string) => {
    setRole(role);
  };

  if (role === 'TEACHER') {
    return <ProfAfterGoogleForm handleRole={handleRole} session={session} />;
  } 
  else {
    return <EtudiantAfterGoogleForm handleRole={handleRole} session={session} />;
  }
}
