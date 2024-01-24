import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string, code: number) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Réinitialisez votre mot de passe',
      html: `
      <!DOCTYPE html>
              <html lang="en">

              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #fff;
                    background-color: #1E2A2D;
                    margin: 0;
                    padding: 0;
                  }

                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #303E40;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    border-radius: 5px;
                  }

                  h2 {
                    color: #4CAF50;
                  }

                  p {
                    margin-bottom: 20px;
                    color: #fff;
                  }

                  code {
                    background-color: #2C3C3D;
                    padding: 5px 8px;
                    border-radius: 3px;
                    color: #4CAF50;
                  }

                  .footer {
                    margin-top: 20px;
                    padding-top: 10px;
                    border-top: 1px solid #4CAF50;
                    color: #4CAF50;
                  }
                </style>
              </head>

              <body>
                <div class="container">
                  <h2>Réinitialisez votre mot de passe</h2>
                  <p>Bonjour,</p>
                  <p>Merci de vous être inscrit sur Ixamee. Pour réinitialisez votre mot de passe, veuillez copier le code de vérification ci-dessous :</p>
                  <p><code>${code}</code></p>
                  <p>Ce code est nécessaire pour confirmer votre e-mail et accéder à votre compte.</p>
                  <p>Merci de faire partie de notre communauté!</p>
                  <p class="footer">Cordialement,<br/>L'équipe Ixamee</p>
                </div>
              </body>

              </html>
      `,
    });
    return { success: 'E-mail renvoyé avec succès' };
  } catch (error) {
    return { error: "Quelque chose s'est mal passé, veuillez réessayer plus tard" };
  }
};

export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Vérifiez votre e-mail',
      html: `
       <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #fff;
            background-color: #1E2A2D;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #303E40;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            border-radius: 5px;
          }

          h2 {
            color: #4CAF50;
          }

          p {
            margin-bottom: 20px;
            color: #fff;
          }

          code {
            background-color: #2C3C3D;
            padding: 5px 8px;
            border-radius: 3px;
            color: #4CAF50;
          }

          .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #4CAF50;
            color: #4CAF50;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h2>Verifier votre e-mail</h2>
          <p>Bonjour,</p>
          <p>Merci de vous être inscrit sur Ixamee. Pour finaliser votre inscription, veuillez copier le code de vérification ci-dessous :</p>
          <p><code>${code}</code></p>
          <p>Ce code est nécessaire pour confirmer votre e-mail et accéder à votre compte.</p>
          <p>Merci de faire partie de notre communauté!</p>
          <p class="footer">Cordialement,<br/>L'équipe Ixamee</p>
        </div>
      </body>

      </html>
      `,
    });

    return { success: 'E-mail renvoyé avec succès' };
  } catch (error) {
    return { error: "Quelque chose s'est mal passé, veuillez réessayer plus tard" };
  }
};

export const sendInvitationEmail = async (email:string,teacherEmail:string,token:string)=>{
  const invitLink=`${domain}/invit-student?token=${token}`
}