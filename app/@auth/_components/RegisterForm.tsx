'use client';

import EtudiantForm from './EtudiantForm';
import ProfForm from './ProfForm';
import { useState } from 'react';
export default function RegisterForm() {
  const [role, setRole] = useState<string>('TEACHER');
  const handleRole = (role: string) => {
    setRole(role);
  };
  if (role === 'TEACHER') {
    return <ProfForm handleRole={handleRole} />;
  } else {
    return <EtudiantForm handleRole={handleRole} />;
  }
}
