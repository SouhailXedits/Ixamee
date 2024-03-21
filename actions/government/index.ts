// 'use server';
import { db } from '@/lib/db';

interface GovernmentResponse {
  data?: typeof db.government[];
  error?: string;
}

export const getAllGovernments = async (): Promise<GovernmentResponse> => {
  try {
    const governments = await db.government.findMany();
    return { data: governments };
  } catch (error: any) {
    console.error('Error fetching governments:', error);
    return {
      error: 'Failed to get governments. Check the console for details.',
    };
  }
};
