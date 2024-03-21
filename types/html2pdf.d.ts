declare module 'html2pdf.js' {
  import { Options, PDFConversionResult } from 'html-to-pdfapi';

  const html2pdf: (
    source: string | Element,
    options?: Options,
  ) => Promise<PDFConversionResult>;

  export default html2pdf;
}
