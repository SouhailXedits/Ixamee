import { auth } from '@/auth';
import { getClassesOfUser } from '@/data/user';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = (await auth()) as any;
  if (session) {
    const userClasses = await getClassesOfUser(session.user.id);
    console.log("🚀 ~ page ~ userClasses:", userClasses)
    userClasses && redirect(`/${userClasses[0].id || ''}  `);
  }
}
