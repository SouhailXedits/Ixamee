'use client';
import { useState } from 'react';
import ProfAfterGoogleForm from './Prof-after-google-form';
import EtudiantAfterGoogleForm from './Etudiant-after-google-form';
export default function GoogleAfterForm() {
  const [role, setRole] = useState<string>('TEACHER');
  const handleRole = (role: string) => {
    setRole(role);
  };
  
  if (role === 'TEACHER') {
    return <ProfAfterGoogleForm handleRole={handleRole} />;
  } else {
    return <EtudiantAfterGoogleForm handleRole={handleRole} />;
  }
}
