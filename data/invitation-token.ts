import { db } from '@/lib/db';
export const getInvitationTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.invitationToken.findUnique({
      where: { token },
    });
    return passwordToken;
  } catch {
    return null;
  }
};

export const getInvitationTokenByEmail = async (recieverEmail: string) => {
  try {
    const passwordToken = await db.invitationToken.findFirst({
      where: { recieverEmail },
    });
    return passwordToken;
  } catch {
    return null;
  }
};
