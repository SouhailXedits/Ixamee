'use server';
import puppeteer from 'puppeteer';

let str = '';
const className = '1ère année S1';
const establishmentName = 'المعهد النموذجي بقابس';
const data = [
  {
    firstName: '(19) Guesmi',
    lastName: 'Mohamed Youssef',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 20,
        range: 1,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 11,
        range: 3,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 14,
        range: 2,
      },
    ],
    studentAvgRange: 1,
  },
  {
    firstName: '(15) Belguith',
    lastName: 'Farah',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 17,
        range: 2,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 4,
        range: 4,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 12,
        range: 3,
      },
    ],
    studentAvgRange: 2,
  },
  {
    firstName: '(26) Belhadj',
    lastName: 'Yasmine',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 13,
        range: 4,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 13,
        range: 1,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 0,
        range: 6,
      },
    ],
    studentAvgRange: 3,
  },
  {
    firstName: '(25) Ghidhaoui',
    lastName: 'Wejden',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 8,
        range: 5,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 0,
        range: 6,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 15,
        range: 1,
      },
    ],
    studentAvgRange: 4,
  },
  {
    firstName: '(23) Chateur',
    lastName: 'Nadia',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 15,
        range: 3,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 1,
        range: 5,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 5,
        range: 4,
      },
    ],
    studentAvgRange: 4,
  },
  {
    firstName: 'بلدي',
    lastName: 'يسابسش',
    result: [
      {
        examName: 'Devoir de Synthese N°1 Maths',
        score: 6,
        range: 6,
      },
      {
        examName: 'Devoir de Controle N°2 Maths',
        score: 12,
        range: 2,
      },
      {
        examName: 'Devoir de Controle N°1 Maths',
        score: 2,
        range: 5,
      },
    ],
    studentAvgRange: 5,
  },
];
data.forEach((el: any) => {
  str += `<tr><td>${el.range}</td><td>${el.name}</td><td>${el.email}</td><td>${el.date}</td></tr>`;
});
const today = new Date();
const currentYear = today.getFullYear();
const nextYear = currentYear + 1;
try {
  async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disabled-setupid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(`
    <!DOCTYPE html>
   <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
        *{
          font-family: 'Jewels', sans-serif;
        }
          table {
            width: 100%;
            text-align: center;
          }
          .range {
            width: 10%;
          }
          .name {
            width: 35%;
          }
          .email {
            width: 35%;
          }
          .createdAt {
            width: 20%;
          }
          .header {
            background-color: var(--12, #99c6d3);
            color: #fff;
          }
          th {
            padding: 8px 0;
            padding-left: 10px;
            text-align: left;
          }
          table,
          th,
          td {
            border-top: 0.5px solid var(--10, #4c4c4d);
            border-right: 0.5px solid var(--10, #4c4c4d);
            border-bottom: 0.5px solid var(--10, #4c4c4d);
            border-left: 1px solid var(--10, #4c4c4d);
            border-collapse: collapse;
          }
          .pdf-header {
            display: flex;
            justify-content: space-between;
            padding: 0 2rem;
          }
          h1 {
            text-align: center;
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
          }
          h2 {
            text-align: center;
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
          }
          img {
            width: 15rem;
          }
          .statistique {
            display: flex;
            justify-content: space-between;
            padding: 0 2rem;
          }
          .pdf-header-establishment {
            color: var(--1, #102528);
            text-align: center;
            font-family: Poppins;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 500;
            line-height: 18px; /* 150% */
            text-transform: capitalize;
          }
          .pdf-header-establishment--details {
            color: var(--1, #102528);
            text-align: center;
            font-family: Poppins;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
          .scolarity {
            color: var(--1, #102528);
            text-align: center;
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 18px; /* 150% */
            text-transform: capitalize;
          }
          .scolarity-years {
            color: var(--1, #102528);
            text-align: center;
            font-family: Poppins;
            font-size: 1rem;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
        </style>
      </head>
      <body>
        <div class="pdf-header" style="display: flex">
          <div>
            <p class="pdf-header-establishment">établissement</p>
            <p>${establishmentName}</p>
          </div>
    
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F30c7ea99d0b24735ba97b08dd7df3f35%2Ffac388fd8f624aab92c8233bad18fefa"
          />
    
          <div>
            <p class="scolarity">Année Scolaire</p>
            <p class="scolarity-years">${currentYear} - ${nextYear}</p>
          </div>
        </div>
        <div>
          <h1>Liste des étudiants</h1>
        </div>
        <div class="statistique">
          <h3><strong>Classe:</strong>${className}</h3>
          <h3><strong>Nombre total des étudiants:</strong> ${data.length}</h3>
        </div>
        <div>
          <table>
            <tr class="header">
              <th class="range">Rang</th>
              <th class="name">Nom & Prénom</th>
              <th class="email">Email</th>
              <th class="createdAt">Ajouté(e) le</th>
            </tr>
            ${str}
          </table>
        </div>
      </body>
    </html>
    `);
    const pdfBuffer = page.pdf({
      format: 'A4',
      printBackground: true,
    });
  };
} catch (err) {}
