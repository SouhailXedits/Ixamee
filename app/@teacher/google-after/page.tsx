import { auth } from '@/auth';
import { getUserEstablishmentByUserId } from '@/data/user';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await auth();
  console.log("🚀 ~ page ~ session:", session)
  const userEstablishment = await getUserEstablishmentByUserId(session?.user.id);
  console.log('🚀 ~ page ~ userEstablishment:', userEstablishment);

  if (session?.user.role) {
    redirect('/2');
  }
  return <div>Bienvenue</div>;
}
