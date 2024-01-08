'use client';

import ProfForm from './ProfForm';
import EtudiantForm from './EtudiantForm';
import { useState } from 'react';
export default function RegisterForm() {
  const [role, setRole] = useState<string>('professeur');
  const handleRole = (role:string) => {
    setRole(role);
  };
  if (role === 'professeur') {
    return <ProfForm handleRole={handleRole} />;
  } else {
    return <EtudiantForm handleRole={handleRole} />;
  }
}
