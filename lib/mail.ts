import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const code = 101010;

  const send = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verifier votre e-mail',
    html: ` <p>coller ce code : <br>${code}</br> dansr votre site. </p>`,
  });
  console.log(send);
};
