import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const sendVerificationEmail = async (email: string) => {
  let code = generateSixDigitNumber();
  
  const send = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verifier votre e-mail',
    html: `<p>Copiez ce code ${code} pour confirmer votre e-mail.</p>`,
  });

  console.log(send);
};