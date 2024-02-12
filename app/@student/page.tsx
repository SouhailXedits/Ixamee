import { auth } from '@/auth';
import { getClassesOfUser } from '@/data/user';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = (await auth()) as any;
  if (session) {
    const userClasses = await getClassesOfUser(session.user.id);

    console.log(userClasses.length > 0);
    redirect(`${userClasses.length > 0 ? `/${userClasses[0]?.id}` : '/0'}`);
  }
}
