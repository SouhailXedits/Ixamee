import { auth } from '@/auth';
import { getUserEstablishmentByUserId } from '@/data/user';
import { redirect } from 'next/navigation';

export default async function Page() {
  // Use destructuring to extract the necessary properties from the session object
  const session = await auth();
  if (!session?.user?.id) {
    // Redirect to the login page or an error page if the user is not authenticated
    redirect('/login');
    return;
  }

  try {
    // Use optional chaining to avoid errors when accessing properties of possibly undefined objects
    const userEstablishment = await getUserEstablishmentByUserId(session.user.id);
    if (!userEstablishment || !userEstablishment[0]?.id) {
      // Redirect to an error page if the user has no establishments or the first establishment has no ID
      redirect('/error');
      return;
    }

    // Redirect to the first establishment page
    redirect(`/${userEstablishment[0].id}`);
  } catch (error) {
    // Handle any errors that might occur during data fetching
    console.error('🚀 ~ Page ~ error:', error);
    redirect('/error');
  }
}
