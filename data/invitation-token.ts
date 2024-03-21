import { db } from '@/lib/db';

export const getInvitationTokenBy = {
  token: async (token: string): Promise<(db.InvitationToken & {
    user: db.User;
  }) | null> => {
    try {
      return await db.invitationToken.findUnique({
        where: { token },
        include: {
          user: true,
        },
      });
    } catch {
      return null;
    }
  },
  email: async (recieverEmail: string): Promise<(db.InvitationToken & {
    user: db.User;
  }) | null> => {
    try {
      return await db.invitationToken.findFirst({
        where: { recieverEmail },
        include: {
          user: true,
        },
      });
    } catch {
      return null;
    }
  },
};

