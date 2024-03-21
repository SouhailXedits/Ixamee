'use client';

import EtudiantForm from './EtudiantForm';
import ProfForm from './ProfForm';
import { useState } from 'react';
export default function RegisterForm() {
  const [role, setRole] = useState<string>('TEACHER');

  const handleRole = (role: string) => {
    setRole(role);
  };

  return (
    <div>
      {role === 'TEACHER' ? <ProfForm handleRole={handleRole} /> : <EtudiantForm handleRole={handleRole} />}
    </div>
  );
}
