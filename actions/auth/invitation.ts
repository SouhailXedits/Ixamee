'use server';

import { getInvitationTokenByToken } from '@/data/invitation-token';
import { getClassesOfUser, getUserByEmail } from '@/data/user';
import { getAllSubjectsByUserId } from '../subjects';

export const verifInvitation = async (token: string) => {
  const existingToken = await getInvitationTokenByToken(token);

  if (!existingToken) {
    return { error: "coupon n'existe pas" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'coupon expiree contacté ton professeur pour vous renvoyer un invitation' };
  }

  const existingTeacher = await getUserByEmail(existingToken.senderEmail);

  if (!existingTeacher) {
    return { error: `invalid professeur avec ce email ${existingToken.senderEmail}` };
  }

  const existingStudent = await getUserByEmail(existingToken.recieverEmail);

  if (!existingStudent) {
    return { error: `invalid etudiant avec ce email ${existingToken.recieverEmail}` };
  }

  try {
    const userClasse = await getClassesOfUser(existingStudent.id);

    try {
      const usersubjects = await getAllSubjectsByUserId(userClasse[0].id);
      return { success: { existingStudent, existingTeacher, userClasse, usersubjects } };
    } catch (getSubError) {
      return { error: 'Erreur lors de la récupération des matières' };
    }
  } catch (getClasseError) {
    return { error: 'Erreur lors de la récupération des classes de l\'utilisateur' };
  }
};
