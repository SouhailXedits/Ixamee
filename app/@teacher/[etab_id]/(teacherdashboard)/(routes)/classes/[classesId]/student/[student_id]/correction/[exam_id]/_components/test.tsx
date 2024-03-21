'use server';
import puppeteer from 'puppeteer';

type Student = {
  firstName: string;
  lastName: string;
  result: {
    examName: string;
    score: number;
    range: number;
  }[];
  studentAvgRange: number;
};

const className = '1ère année S1';
const establishmentName = 'المعهد النموذجي بقابس';
const data: Student[] = [
  // ...
];
const exams = ['Devoir de Synthese N°1 Maths', 'Devoir de Controle N°2 Maths', 'Devoir de Controle N°1 Maths'];
const today = new Date();
const currentYear = today.getFullYear();
const nextYear = currentYear + 1;

function generateTableRow(student: Student): string {
  let row = '<tr>';
  row += `<td>${student.studentAvgRange}</td>`;
  row += `<td>${student.lastName} ${student.firstName}</td>`;
  const studentEmail = ' '; // Add your logic to generate student email
  row += `<td>${studentEmail}</td>`;
  row += `<td>${formatDate(today)}</td></tr>`;
  return row;
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatStudentAvgRange(student: Student): string {
  const ranges = student.result.map((r) => r.range);
  const avgRange = Math.round(ranges.reduce((a, b) => a + b, 0) / ranges.length);
  return avgRange.toString();
}

async function launchBrowser(): Promise<puppeteer.Browser> {
  const args = ['--no-sandbox', '--disabled-setupid-sandbox'];
  return puppeteer.launch({ args });
}

function generateHtmlContent(data: Student[], exams: string[], className: string, establishmentName: string, currentYear: number, nextYear: number): string {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- ... -->
      </head>
      <body>
        <!-- ... -->
        <div>
          <table>
            <tr class="header">
              <th class="range">Rang</th>
              <th class="name">Nom & Prénom</th>
              <th class="email">Email</th>
              <th class="createdAt">Ajouté(e) le</th>
            </tr>
  `;
  data.forEach((student) => {
    html += generateTableRow(student);
  });
  html += `
          </table>
        </div>
      </body>
    </html>
  `;
  return html;
}

async function generatePdf() {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    const htmlContent = generateHtmlContent(data, exams, className, establishmentName, currentYear, nextYear);
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    // Add your logic to save the PDF buffer
  } catch (err) {
    console.error(err);
  }
}

generatePdf();
