'use server';
import { db } from '@/lib/db';

export const getAllGovernments = async () => {
  try {
    const governments = await db.government.findMany();
    return { data: governments, error: undefined };
  } catch (error: any) {
    console.error('Error fetching governments:', error);
    return {
      data: undefined as any,
      error: 'Failed to get governments. Check the console for details.',
    };
  }
};
