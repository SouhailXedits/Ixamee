import { auth } from '@/auth';
import { getUserEstablishmentByUserId } from '@/data/user';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = (await auth()) as any;
  console.log("🚀 ~ page ~ session:", session)

  const userEstablishment = await getUserEstablishmentByUserId(session?.user.id);
  redirect(`/${userEstablishment[0].id}`);
}
