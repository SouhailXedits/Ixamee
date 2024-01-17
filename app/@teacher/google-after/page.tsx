import { auth } from '@/auth';
import { getUserEstablishmentByUserId } from '@/data/user';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await auth() as any;  
  const userEstablishment = await getUserEstablishmentByUserId(session?.user.id)
  
  if (session?.user.role) {
    redirect(`/${userEstablishment[0].id}`);
  }
  return <div>Bienvenue</div>;
}
