'use server';

import { signOut } from '@/auth';

export const logout = async (req, res) => {
  try {
    await signOut();
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('An error occurred while logging out. Please try again later.');
  }
};

