import nodemailer from 'nodemailer';
import { getEnvVariable } from './env';
import { emailHtml as generateEmailHtml } from './email-html';

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: getEnvVariable('EMAIL'),
    pass: getEnvVariable('EMAIL_PASS'),
  },
});

const sendEmail = async (email: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: getEnvVariable('EMAIL'),
      to: email,
      subject,
      html,
    });
    return { success: 'E-mail renvoyé avec succès' };
  } catch (error) {
    console.error(error);
    return { error: "Quelque chose s'est mal passé, veuillez réessayer plus tard" };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string, code: number) => {
  const html = generateEmailHtml('Réinitialisez votre mot de passe', email, code, token);
  return sendEmail(email, 'Réinitialisez votre mot de passe', html);
};

export const sendVerificationEmail = async (email: string, code: number) => {
  const html = generateEmailHtml('Vérifiez votre e-mail', email, code, '');
  return sendEmail(email, 'Vérifiez votre e-mail', html);
};

export const sendInvitationEmail = async (
  studentEmail: string,
  teacherEmail: string,
  token: string
) => {
  const invitLink = `${getEnvVariable('NEXT_PUBLIC_APP_URL')}/invit-student?token=${token}`;
  const html = generateEmailHtml(`Invitation de ${teacherEmail}`, studentEmail, '', invitLink);
  return sendEmail(studentEmail, `Invitation de ${teacherEmail}`, html);
};

// email-html.ts
export const generateEmailHtml = (
  subject: string,
  email: string,
  code: number | string,
  invitLink?: string
) => {
  const link = invitLink || '';
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: white;
      background-color: white;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #1B8392;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }

    h2 {
      color: white;
    }

    p {
      margin-bottom: 20px;
      color: white;
    }

    code {
      background-color: white;
      padding: 5px 8px;
      border-radius: 3px;
      color: #FBB800;
    }

    .footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid white;
      color: white;
    }

    a {
      color: #FBB800;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>${subject}</h2>
    <p>Bonjour,</p>
    ${
    subject === 'Invitation de' ? `
    <p>Vous êtes ajouté à Ixamee:</p>
    <p>Cliquez <a href="${link}">ici</a> pour confirmer votre e-mail et accéder à votre compte.</p>
    ` : `
    <p>Merci de vous être inscrit sur Ixamee. Pour ${subject.toLowerCase()}, veuillez copier le code de vérification ci-dessous :</p>
    <p><code>${code}</code></p>
    <p>Ce code est nécessaire pour confirmer votre e-mail et accéder à votre compte.</p>
    `
  }
    <p>Merci de faire partie de notre communauté!</p>
    <p class="footer">Cordialement,<br/>L'équipe Ixamee</p>
  </div>
</body>

</html>
  `;
};

// env.ts
export const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};
