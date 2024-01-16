// utils/withAdminRole.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
// import { User } from '../types/user';
import { auth } from '@/auth';

interface WithAdminRoleProps {
  children: ReactNode;
}

const withAdminRole = async (WrappedComponent: React.FC) => {
    const session = await auth();
    console.log(session?.user)
  const Wrapper: React.FC<WithAdminRoleProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // If the user is not authenticated, redirect to login page
    if (status === 'loading' || !session) {
      return <p>Loading...</p>;
    }

    // If the user is not an admin, redirect to another page (e.g., home)
    // const user = session.user as User;
    const user = session.user;
    if (user.role !== 'ADMIN') {
      router.push('/'); // Redirect to the home page or any other page
      return null;
    }

    // If the user is authenticated and has the ADMIN role, render the component
    return <WrappedComponent />;
  };

  return Wrapper;
};

export default withAdminRole;
