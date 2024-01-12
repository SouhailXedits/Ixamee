import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string , code:number) => {

  console.log(email,code);
  
  const send = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verifier votre e-mail',
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
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }

          h2 {
            color: #007BFF;
          }

          p {
            margin-bottom: 20px;
          }

          code {
            background-color: #f8f8f8;
            padding: 5px 8px;
            border-radius: 3px;
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
          <p>Cordialement,<br/>L'équipe Ixamee</p>
        </div>
      </body>
      </html>
    `,
  });

  console.log(send);
};